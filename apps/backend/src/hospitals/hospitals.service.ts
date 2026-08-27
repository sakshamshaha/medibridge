import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalsService {
  constructor(private prisma: PrismaService) {}

  async findAll(city?: string, q?: string) {
    const whereClause: any = {};
    if (city) {
      whereClause.city = city;
    }
    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { specialties: { contains: q } },
        { address: { contains: q } }
      ];
    }
    
    const hospitals = await this.prisma.hospital.findMany({
      where: whereClause,
      // In a real app we might paginate this or limit it
      take: 200,
    });

    // We return a single "group" to match the frontend's expected Bento Grid structure
    return [
      {
        id: 'all-hospitals',
        name: 'Hospitals',
        description: city ? `Available facilities in ${city}` : 'All available facilities',
        hospitals: hospitals.map(h => ({
          id: h.id,
          name: h.name,
          type: h.type,
          distance: "2.5 km", // mock for now
          treated: h.patientsTreated || '0',
          photo: h.photos ? h.photos : null,
          latitude: h.latitude,
          longitude: h.longitude,
          address: h.address,
          googleRating: h.googleRating,
          googleUserRatingsTotal: h.googleUserRatingsTotal,
          googleFormattedAddress: h.googleFormattedAddress,
          googlePhotos: h.googlePhotos ? JSON.parse(h.googlePhotos) : [],
          googleReviews: h.googleReviews ? JSON.parse(h.googleReviews) : []
        }))
      }
    ];
  }
}
