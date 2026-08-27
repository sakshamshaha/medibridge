import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(q?: string, city?: string) {
    const whereClause: any = {};
    
    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { qualifications: { contains: q } }
      ];
    }

    if (city) {
      whereClause.hospitals = {
        some: {
          hospital: {
            city: { contains: city }
          }
        }
      };
    }

    const doctors = await this.prisma.doctor.findMany({
      where: whereClause,
      include: {
        hospitals: {
          include: {
            hospital: true
          }
        }
      }
    });

    return doctors.map(doc => ({
      id: doc.id,
      name: doc.name,
      specialty: JSON.parse(doc.qualifications)[2] || 'Specialist',
      experience: `${doc.experienceYears}+ Years`,
      hospitals: doc.hospitals.map(h => h.hospital.name),
      rating: 4.9, // mock
      distance: "2.1 km", // mock
    }));
  }
}
