import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(process.cwd(), '../../medicinesdataset/MediBridge_Big_Medicine_Master_Dataset.xlsx');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`\n======================================`);
  console.log(`Processing medicine dataset: MediBridge_Big_Medicine_Master_Dataset.xlsx`);
  const fileBuffer = fs.readFileSync(filePath);
  const xlsxLib = (xlsx as any).default || xlsx;
  const workbook = xlsxLib.read(fileBuffer, { type: 'buffer' });
  
  // Use the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData: any[] = xlsxLib.utils.sheet_to_json(sheet);
  console.log(`Found ${rawData.length} rows in ${sheetName}. Starting import...`);
  
  let successCount = 0;
  const failedRows: any[] = [];

  for (const [index, row] of rawData.entries()) {
    const rowNum = index + 2;
    
    // Extract fields
    const externalId = row['product_id'] ? String(row['product_id']).trim() : null;
    const name = row['medicine_name'] ? String(row['medicine_name']).trim() : null;
    const genericName = row['generic_name'] ? String(row['generic_name']).trim() : null;
    const strength = row['strength'] ? String(row['strength']).trim() : null;
    const dosageForm = row['dosage_form'] ? String(row['dosage_form']).trim() : null;
    const manufacturer = row['manufacturer'] ? String(row['manufacturer']).trim() : null;
    const category = row['category'] ? String(row['category']).trim() : null;
    const therapeuticClass = row['therapeutic_class'] ? String(row['therapeutic_class']).trim() : null;
    const packSize = row['pack_size'] ? String(row['pack_size']).trim() : null;
    
    // Parse Prescription Required boolean
    let requiresPrescription = false;
    const rxRaw = row['prescription_required'] ? String(row['prescription_required']).toLowerCase() : '';
    if (rxRaw.includes('true') || rxRaw.includes('yes') || rxRaw.includes('verify before sale')) {
      requiresPrescription = true;
    }

    // Number fields (empty string should be null)
    const parseCurrency = (val: any) => {
      if (!val) return null;
      const num = parseFloat(String(val).replace(/[^0-9.]/g, ''));
      return isNaN(num) ? null : num;
    };
    const mrp = parseCurrency(row['mrp']);
    const sellingPrice = parseCurrency(row['selling_price']);
    const discount = parseCurrency(row['discount']);
    
    const uses = row['uses'] ? String(row['uses']).trim() : null;
    const description = row['description'] ? String(row['description']).trim() : null;
    const imageFilename = row['image_filename'] ? String(row['image_filename']).trim() : null;
    const imageSource = row['image_source'] ? String(row['image_source']).trim() : null;
    const sourceUrl = row['source_url'] ? String(row['source_url']).trim() : null;
    const catalogStatus = row['catalog_status'] ? String(row['catalog_status']).trim() : null;

    // Dates
    let lastUpdatedDate = null;
    if (row['last_updated']) {
      const parsedDate = new Date(row['last_updated']);
      if (!isNaN(parsedDate.getTime())) lastUpdatedDate = parsedDate;
    }
    
    // Validation
    if (!externalId) {
      failedRows.push({ row: rowNum, reason: 'Missing product_id', data: row });
      continue;
    }
    if (!name) {
      failedRows.push({ row: rowNum, reason: 'Missing medicine_name', data: row });
      continue;
    }

    const dataObj = {
      name,
      genericName,
      strength,
      dosageForm,
      manufacturer,
      category,
      therapeuticClass,
      packSize,
      requiresPrescription,
      mrp,
      sellingPrice,
      discount,
      uses,
      description,
      imageFilename,
      imageSource,
      sourceUrl,
      catalogStatus,
      lastUpdatedDate
    };

    try {
      await prisma.medicine.upsert({
        where: { externalId },
        update: dataObj,
        create: {
          externalId,
          ...dataObj
        }
      });
      
      successCount++;
    } catch (error: any) {
      failedRows.push({ row: rowNum, reason: error.message, data: row });
    }
  }
  
  console.log(`✅ Imported ${successCount} out of ${rawData.length}`);

  console.log('\n======================================');
  console.log('--- GLOBAL MEDICINE IMPORT SUMMARY ---');
  console.log(`Total Successfully Imported: ${successCount}`);
  console.log(`Total Failed Rows: ${failedRows.length}`);
  
  if (failedRows.length > 0) {
    console.log('\n--- FAILED ROWS DETAILS ---');
    failedRows.forEach(f => {
      console.log(`Row ${f.row}: ${f.reason}`);
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
