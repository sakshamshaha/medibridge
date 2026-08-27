import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(q?: string, categories?: string, rx?: string, maxPrice?: string) {
    const whereClause: any = {};
    
    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { genericName: { contains: q } },
      ];
    }

    if (categories) {
      const catsArray = categories.split(',');
      whereClause.category = { in: catsArray };
    }

    if (rx === 'true') {
      whereClause.requiresPrescription = true;
    } else if (rx === 'false') {
      whereClause.requiresPrescription = false;
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        whereClause.sellingPrice = { lte: max };
      }
    }

    const medicines = await this.prisma.medicine.findMany({
      where: whereClause,
      take: 100 // Limit for now to prevent massive payloads
    });

    return medicines.map(med => ({
      id: med.id,
      name: med.name,
      category: med.category || "General",
      desc: med.description || med.uses || `${med.genericName || ''} ${med.dosageForm || ''}`.trim(),
      price: med.sellingPrice || med.mrp || 0,
      mrp: med.mrp,
      discount: med.discount,
      image: med.imageFilename || "https://placehold.co/400x400/eeeeee/333333?text=NO+IMAGE",
      rxRequired: med.requiresPrescription,
    }));
  }
}
