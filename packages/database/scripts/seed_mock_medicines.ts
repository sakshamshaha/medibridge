import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get random integer between min and max (inclusive)
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log('🔄 Starting Mock Medicines Seed...');
  
  // Find medicines where mrp or imageFilename is missing
  const medicines = await prisma.medicine.findMany({
    where: {
      OR: [
        { mrp: null },
        { imageFilename: null }
      ]
    }
  });

  console.log(`Found ${medicines.length} medicines missing MRP or images. Generating demo data...`);

  let updatedCount = 0;

  for (const medicine of medicines) {
    let mrp = medicine.mrp;
    let sellingPrice = medicine.sellingPrice;
    let discount = medicine.discount;
    let imageFilename = medicine.imageFilename;
    let isDemoData = medicine.isDemoData;

    let needsUpdate = false;

    // Generate Demo Pricing
    if (mrp === null) {
      // Base MRP heavily on dosage form
      const form = (medicine.dosageForm || '').toLowerCase();
      
      let minPrice = 30;
      let maxPrice = 300;

      if (form.includes('injection') || form.includes('vial') || form.includes('ampoule')) {
        minPrice = 500;
        maxPrice = 2500;
      } else if (form.includes('syrup') || form.includes('suspension') || form.includes('solution')) {
        minPrice = 80;
        maxPrice = 250;
      } else if (form.includes('cream') || form.includes('ointment') || form.includes('gel')) {
        minPrice = 60;
        maxPrice = 350;
      } else if (form.includes('inhaler') || form.includes('respules')) {
        minPrice = 300;
        maxPrice = 900;
      } else if (form.includes('capsule') || form.includes('tablet')) {
        minPrice = 50;
        maxPrice = 400;
      }

      // Generate a realistic MRP ending in 0 or 5 for neatness, or a random exact number
      mrp = randomInt(minPrice, maxPrice);
      
      // Add standard 10-25% discount to generate selling price
      const discountPercentage = randomInt(10, 25);
      sellingPrice = parseFloat((mrp * (1 - (discountPercentage / 100))).toFixed(2));
      discount = discountPercentage; // Store the percentage
      
      isDemoData = true;
      needsUpdate = true;
    }

    // Generate Demo Image
    if (!imageFilename) {
      // We will assign a predictable placeholder image URL
      // We can use placehold.co for a clear, labeled box, indicating it's a demo image
      // Let's generate a placeholder that displays the medicine's initials or "DEMO MED"
      
      // Create a URL-safe short name (first 15 chars)
      const shortName = encodeURIComponent((medicine.name.substring(0, 15) || 'MEDICINE').trim());
      
      // placehold.co format: https://placehold.co/400x400/eeeeee/333333?text=DEMO\nMEDICINE
      imageFilename = `https://placehold.co/400x400/eeeeee/333333?text=DEMO+DATA%5Cn${shortName}`;
      
      isDemoData = true;
      needsUpdate = true;
    }

    if (needsUpdate) {
      await prisma.medicine.update({
        where: { id: medicine.id },
        data: {
          mrp,
          sellingPrice,
          discount,
          imageFilename,
          isDemoData
        }
      });
      updatedCount++;
    }

    if (updatedCount % 50 === 0 && needsUpdate) {
      console.log(`Seeded demo data for ${updatedCount} medicines...`);
    }
  }

  console.log(`✅ Successfully generated demo prices and images for ${updatedCount} medicines.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
