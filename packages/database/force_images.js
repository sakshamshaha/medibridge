const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Forcing all medicine images to placehold.co...');
  const medicines = await prisma.medicine.findMany();
  
  let count = 0;
  for (const medicine of medicines) {
    // If the image is a local filename or null or already placehold.co without png
    if (!medicine.imageFilename || !medicine.imageFilename.startsWith('http') || !medicine.imageFilename.includes('.png')) {
      const shortName = encodeURIComponent((medicine.name.substring(0, 15) || 'MEDICINE').trim());
      const newUrl = `https://placehold.co/400x400/eeeeee/333333.png?text=DEMO+DATA%5Cn${shortName}`;
      
      await prisma.medicine.update({
        where: { id: medicine.id },
        data: { imageFilename: newUrl, isDemoData: true }
      });
      count++;
    }
  }
  
  console.log(`Successfully updated ${count} images!`);
}

main().finally(() => prisma.$disconnect());
