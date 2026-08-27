const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.medicine.findMany({take: 5}).then(m => {
  console.log(m.map(x => x.imageFilename));
  p.$disconnect();
});
