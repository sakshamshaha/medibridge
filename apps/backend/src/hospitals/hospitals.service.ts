import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const procedures = await this.prisma.procedure.findMany({
      include: {
        hospital: true,
      },
    });

    // Group by procedure to match frontend format
    const grouped: any[] = [];
    
    procedures.forEach(proc => {
      let existing = grouped.find(g => g.name === proc.name);
      if (!existing) {
        existing = {
          id: proc.name.toLowerCase(),
          name: proc.name,
          description: `Treatment for ${JSON.parse(proc.diseaseTags)[0]}`,
          hospitals: []
        };
        grouped.push(existing);
      }
      
      existing.hospitals.push({
        id: proc.hospital.id,
        name: proc.hospital.name,
        type: proc.hospital.type,
        distance: "2.5 km", // mock for now
        treated: proc.hospital.patientsTreated,
      });
    });

    return grouped;
  }
}
