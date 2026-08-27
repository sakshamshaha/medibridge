const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const medicines = await prisma.medicine.findMany({
    where: { isDemoData: true }
  });

  for (const medicine of medicines) {
    if (medicine.imageFilename && medicine.imageFilename.includes('placehold.co') && !medicine.imageFilename.includes('.png')) {
      const newUrl = medicine.imageFilename.replace('333333?text', '333333.png?text');
      await prisma.medicine.update({
        where: { id: medicine.id },
        data: { imageFilename: newUrl }
      });
    }
  }
  console.log('Fixed URLs');
}

main().finally(() => prisma.$disconnect());
