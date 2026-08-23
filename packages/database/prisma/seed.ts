// packages/database/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean up
  await prisma.billItem.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.demandNodeItem.deleteMany();
  await prisma.retailerStock.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.insuranceProvider.deleteMany();
  await prisma.doctorHospital.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      passwordHash: 'hashedpassword',
      role: 'CUSTOMER'
    }
  });

  const retailer = await prisma.user.create({
    data: {
      email: 'retailer@example.com',
      passwordHash: 'hashedpassword',
      role: 'RETAILER'
    }
  });

  // Create Hospitals
  const hospital1 = await prisma.hospital.create({
    data: {
      name: 'Apollo Hospitals',
      type: 'Private',
      location: '{"lat": 28.5678, "lng": 77.2800}',
      licenses: JSON.stringify(['NABH', 'JCI']),
      patientsTreated: '1M+',
      photos: JSON.stringify(['https://example.com/apollo.jpg'])
    }
  });

  const hospital2 = await prisma.hospital.create({
    data: {
      name: 'Max Super Speciality',
      type: 'Private',
      location: '{"lat": 28.5273, "lng": 77.2154}',
      licenses: JSON.stringify(['NABH']),
      patientsTreated: '500k+',
      photos: JSON.stringify(['https://example.com/max.jpg'])
    }
  });

  // Create Procedures
  await prisma.procedure.create({
    data: {
      name: 'PCNL',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ "room": 15000, "surgery": 45000, "consumables": 10000 }),
      hospitalId: hospital1.id
    }
  });

  await prisma.procedure.create({
    data: {
      name: 'RIRS',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ "room": 20000, "surgery": 60000, "consumables": 15000 }),
      hospitalId: hospital1.id
    }
  });

  await prisma.procedure.create({
    data: {
      name: 'URS',
      diseaseTags: JSON.stringify(['Kidney Stone']),
      expenseBreakdown: JSON.stringify({ "room": 12000, "surgery": 35000, "consumables": 8000 }),
      hospitalId: hospital2.id
    }
  });

  // Create Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Dr. Sanjay Sharma',
      qualifications: JSON.stringify(['MBBS', 'MS - General Surgery', 'MCh - Urology']),
      experienceYears: 15
    }
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. Anita Desai',
      qualifications: JSON.stringify(['MBBS', 'MD - Cardiology']),
      experienceYears: 12
    }
  });

  await prisma.doctorHospital.create({
    data: { doctorId: doctor1.id, hospitalId: hospital1.id }
  });

  await prisma.doctorHospital.create({
    data: { doctorId: doctor1.id, hospitalId: hospital2.id }
  });

  await prisma.doctorHospital.create({
    data: { doctorId: doctor2.id, hospitalId: hospital1.id }
  });

  // Create Medicines
  const paracetamol = await prisma.medicine.create({
    data: { name: 'Paracetamol 500mg', scheduleClass: 'None', requiresPrescription: false }
  });
  const amoxicillin = await prisma.medicine.create({
    data: { name: 'Amoxicillin 250mg', scheduleClass: 'H1', requiresPrescription: true }
  });
  const ibuprofen = await prisma.medicine.create({
    data: { name: 'Ibuprofen 400mg', scheduleClass: 'None', requiresPrescription: false }
  });
  const alprazolam = await prisma.medicine.create({
    data: { name: 'Alprazolam 0.5mg', scheduleClass: 'H', requiresPrescription: true }
  });
  const cetirizine = await prisma.medicine.create({
    data: { name: 'Cetirizine 10mg', scheduleClass: 'None', requiresPrescription: false }
  });

  // Create Retailer Stock
  const expiryNextMonth = new Date();
  expiryNextMonth.setMonth(expiryNextMonth.getMonth() + 1);

  const expiryNextYear = new Date();
  expiryNextYear.setFullYear(expiryNextYear.getFullYear() + 1);

  await prisma.retailerStock.create({
    data: { retailerId: retailer.id, medicineId: paracetamol.id, qty: 150, avgDailySales: 20, expiryDate: expiryNextYear }
  });
  await prisma.retailerStock.create({
    data: { retailerId: retailer.id, medicineId: amoxicillin.id, qty: 12, avgDailySales: 15, expiryDate: expiryNextYear }
  }); // Needs reorder
  await prisma.retailerStock.create({
    data: { retailerId: retailer.id, medicineId: ibuprofen.id, qty: 25, avgDailySales: 5, expiryDate: expiryNextMonth }
  }); // Near expiry
  await prisma.retailerStock.create({
    data: { retailerId: retailer.id, medicineId: alprazolam.id, qty: 40, avgDailySales: 2, expiryDate: expiryNextYear }
  });
  await prisma.retailerStock.create({
    data: { retailerId: retailer.id, medicineId: cetirizine.id, qty: 8, avgDailySales: 10, expiryDate: expiryNextMonth }
  }); // Needs reorder + Near expiry

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
