const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.medicine.findFirst({where: {isDemoData: true}}).then(m => {
  console.log(m.imageFilename);
  p.$disconnect();
});
