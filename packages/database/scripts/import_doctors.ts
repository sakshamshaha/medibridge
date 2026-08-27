import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const datasets = [
    { file: 'MediBridge_Gwalior_Doctor_Inquiry_Dataset_Expanded.xlsx', city: 'Gwalior' },
    { file: 'MediBridge_Indore_200Plus_Doctor_Master_Dataset.xlsx', city: 'Indore' },
    { file: 'MediBridge_Bhopal_200Plus_Doctor_Master_Dataset.xlsx', city: 'Bhopal' },
    { file: 'MediBridge_Ujjain_200Plus_Doctor_Master_Dataset.xlsx', city: 'Ujjain' },
  ];

  let totalSuccess = 0;
  const allFailedRows: any[] = [];

  for (const dataset of datasets) {
    const filePath = path.join(process.cwd(), '../../doctordataset', dataset.file);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}, skipping...`);
      continue;
    }

    console.log(`\n======================================`);
    console.log(`Processing doctor dataset for ${dataset.city}: ${dataset.file}`);
    const fileBuffer = fs.readFileSync(filePath);
    const xlsxLib = (xlsx as any).default || xlsx;
    const workbook = xlsxLib.read(fileBuffer, { type: 'buffer' });
    
    // Some doctor datasets have a 'Summary' sheet first. Let's find the main data sheet.
    // Usually it's the second sheet if 'Summary' exists, or just the first data sheet.
    let sheetName = workbook.SheetNames.find((name: string) => name.toLowerCase().includes(dataset.city.toLowerCase()) || name.toLowerCase().includes('doctor'));
    if (!sheetName) sheetName = workbook.SheetNames[1] || workbook.SheetNames[0];
    
    const sheet = workbook.Sheets[sheetName];
    const rawData: any[] = xlsxLib.utils.sheet_to_json(sheet);
    console.log(`Found ${rawData.length} rows in ${dataset.city} (Sheet: ${sheetName}). Starting import...`);
    
    let successCount = 0;
    const failedRows: any[] = [];

    for (const [index, row] of rawData.entries()) {
      const rowNum = index + 2;
      
      const externalId = row['Doctor ID'] ? String(row['Doctor ID']).trim() : null;
      const name = row['Doctor Name'] ? String(row['Doctor Name']).trim() : null;
      const primaryField = row['Primary Field'] ? String(row['Primary Field']).trim() : '';
      const specialty = row['Specialty / Domain'] ? String(row['Specialty / Domain']).trim() : '';
      const qualificationsRaw = row['Qualifications'] ? String(row['Qualifications']).trim() : '';
      const hospitalName = row['Hospital / Clinic'] ? String(row['Hospital / Clinic']).trim() : null;
      const experienceRaw = row['Experience (yrs)'];
      
      if (!name) {
        failedRows.push({ row: rowNum, city: dataset.city, reason: 'Missing Doctor Name', data: row });
        continue;
      }

      // Parse Experience
      let experienceYears = 0;
      if (experienceRaw) {
        const parsed = parseInt(String(experienceRaw).replace(/[^0-9]/g, ''));
        if (!isNaN(parsed)) experienceYears = parsed;
      }

      // Format Qualifications as JSON string so frontend can extract `[2]` as specialty
      const qualificationsJson = JSON.stringify([primaryField, qualificationsRaw, specialty]);

      try {
        let doctorId;

        // UPSERT DOCTOR
        if (externalId) {
          const doc = await prisma.doctor.upsert({
            where: { externalId },
            update: {
              name,
              qualifications: qualificationsJson,
              experienceYears,
            },
            create: {
              externalId,
              name,
              qualifications: qualificationsJson,
              experienceYears,
            }
          });
          doctorId = doc.id;
        } else {
          // Fallback if no externalId
          const doc = await prisma.doctor.create({
            data: {
              name,
              qualifications: qualificationsJson,
              experienceYears,
            }
          });
          doctorId = doc.id;
        }

        // LINK HOSPITAL
        if (hospitalName) {
          // Try to find hospital by fuzzy match on name in the same city
          const hospitals = await prisma.hospital.findMany({
            where: { city: dataset.city },
            select: { id: true, name: true }
          });
          
          // Very simple match: check if the string contains the other string
          let matchedHospital = hospitals.find(h => 
            h.name.toLowerCase().includes(hospitalName.toLowerCase()) || 
            hospitalName.toLowerCase().includes(h.name.toLowerCase())
          );

          if (matchedHospital) {
            // Upsert the relationship
            await prisma.doctorHospital.upsert({
              where: {
                doctorId_hospitalId: {
                  doctorId: doctorId,
                  hospitalId: matchedHospital.id
                }
              },
              update: {},
              create: {
                doctorId: doctorId,
                hospitalId: matchedHospital.id
              }
            });
          }
        }
        
        successCount++;
        totalSuccess++;
      } catch (error: any) {
        failedRows.push({ row: rowNum, city: dataset.city, reason: error.message, data: row });
      }
    }
    
    console.log(`✅ ${dataset.city}: Imported ${successCount} out of ${rawData.length}`);
    allFailedRows.push(...failedRows);
  }

  console.log('\n======================================');
  console.log('--- GLOBAL DOCTOR IMPORT SUMMARY ---');
  console.log(`Total Successfully Imported: ${totalSuccess}`);
  console.log(`Total Failed Rows: ${allFailedRows.length}`);
  
  if (allFailedRows.length > 0) {
    console.log('\n--- FAILED ROWS DETAILS ---');
    allFailedRows.forEach(f => {
      console.log(`[${f.city}] Row ${f.row}: ${f.reason}`);
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
