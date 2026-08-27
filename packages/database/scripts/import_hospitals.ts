import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const datasets = [
    { file: 'MediBridge_Gwalior_Hospital_Master_Dataset.xlsx', city: 'Gwalior' },
    { file: 'MediBridge_Indore_Hospital_Dataset.xlsx', city: 'Indore' },
    { file: 'MediBridge_Bhopal_Hospital_Dataset.xlsx', city: 'Bhopal' },
    { file: 'MediBridge_Ujjain_Hospital_Dataset.xlsx', city: 'Ujjain' },
    { file: 'MediBridge_Jabalpur_Hospital_Dataset.xlsx', city: 'Jabalpur' },
  ];

  let totalSuccess = 0;
  const allFailedRows: any[] = [];

  for (const dataset of datasets) {
    const filePath = path.join(process.cwd(), '../../hospitaldataset', dataset.file);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}, skipping...`);
      continue;
    }

    console.log(`\n======================================`);
    console.log(`Processing dataset for ${dataset.city}: ${dataset.file}`);
    const fileBuffer = fs.readFileSync(filePath);
    const xlsxLib = (xlsx as any).default || xlsx;
    const workbook = xlsxLib.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    const rawData: any[] = xlsxLib.utils.sheet_to_json(sheet);
    console.log(`Found ${rawData.length} rows in ${dataset.city}. Starting import...`);
    
    let successCount = 0;
    const failedRows: any[] = [];

    for (const [index, row] of rawData.entries()) {
      const rowNum = index + 2;
      
      const externalId = row['Hospital ID'] ? String(row['Hospital ID']).trim() : null;
      const name = row['Hospital Name'] ? String(row['Hospital Name']).trim() : null;
      const type = row['Type'] ? String(row['Type']).trim() : 'Unknown';
      const phone = row['Phone'] ? String(row['Phone']).trim() : null;
      const address = row['Address'] ? String(row['Address']).trim() : null;
      const empanelment = row['Scheme/Empanelment'] ? String(row['Scheme/Empanelment']).trim() : null;
      const specialtiesRaw = row['Specialities/Category'] ? String(row['Specialities/Category']) : null;
      const verificationSource = row['Verification Source'] ? String(row['Verification Source']).trim() : null;
      const website = row['Website'] ? String(row['Website']).trim() : null;
      const beds = row['Beds'] ? parseInt(row['Beds']) : null;
      const latitude = row['Latitude'] ? parseFloat(row['Latitude']) : null;
      const longitude = row['Longitude'] ? parseFloat(row['Longitude']) : null;
      const notes = row['Notes'] ? String(row['Notes']).trim() : null;

      if (!name || !address) {
        failedRows.push({ row: rowNum, city: dataset.city, reason: 'Missing Hospital Name or Address', data: row });
        continue;
      }

      let specialtiesJson = null;
      if (specialtiesRaw) {
        const parts = specialtiesRaw.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        specialtiesJson = JSON.stringify(parts);
      }

      try {
        if (externalId) {
          await prisma.hospital.upsert({
            where: { externalId_city: { externalId, city: dataset.city } },
            update: {
              name,
              type,
              address,
              phone,
              empanelment,
              specialties: specialtiesJson,
              verificationSource,
              website,
              beds: isNaN(beds as number) ? null : beds,
              latitude: isNaN(latitude as number) ? null : latitude,
              longitude: isNaN(longitude as number) ? null : longitude,
              notes
            },
            create: {
              externalId,
              name,
              type,
              address,
              city: dataset.city,
              phone,
              empanelment,
              specialties: specialtiesJson,
              verificationSource,
              website,
              beds: isNaN(beds as number) ? null : beds,
              latitude: isNaN(latitude as number) ? null : latitude,
              longitude: isNaN(longitude as number) ? null : longitude,
              notes,
              licenses: null,
              patientsTreated: null,
              photos: null
            }
          });
        } else {
          await prisma.hospital.create({
            data: {
              name,
              type,
              address,
              city: dataset.city,
              phone,
              empanelment,
              specialties: specialtiesJson,
              verificationSource,
              website,
              beds: isNaN(beds as number) ? null : beds,
              latitude: isNaN(latitude as number) ? null : latitude,
              longitude: isNaN(longitude as number) ? null : longitude,
              notes,
              licenses: null,
              patientsTreated: null,
              photos: null
            }
          });
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
  console.log('--- GLOBAL IMPORT SUMMARY ---');
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
