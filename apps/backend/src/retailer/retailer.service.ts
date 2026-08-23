import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RetailerService {
  constructor(private prisma: PrismaService) {}

  async getStock() {
    const stock = await this.prisma.retailerStock.findMany({
      include: { medicine: true }
    });

    return stock.map(s => ({
      id: s.medicine.id,
      name: s.medicine.name,
      currentStock: s.qty,
      avgDailySales: s.avgDailySales,
      expiry: s.expiryDate?.toISOString().split('T')[0] || "2099-12-31"
    }));
  }

  async processBilling(cart: any[], doctorName: string) {
    // 1. Get the retailer user
    const retailerUser = await this.prisma.user.findFirst({
      where: { role: 'RETAILER' }
    });

    if (!retailerUser) throw new BadRequestException("Retailer not found");

    // 2. Validate prescription
    const hasRestricted = cart.some(item => item.requiresPrescription);
    if (hasRestricted && (!doctorName || doctorName.trim().length < 4)) {
      throw new BadRequestException("Doctor name is required for restricted medicines");
    }

    // 3. Create bill and decrement stock
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const bill = await this.prisma.bill.create({
      data: {
        retailerId: retailerUser.id,
        prescribingDoctorName: hasRestricted ? doctorName : null,
        total,
        items: {
          create: cart.map(item => ({
            medicineId: item.id,
            qty: item.qty,
            price: item.price
          }))
        }
      }
    });

    // Decrement stock
    for (const item of cart) {
      await this.prisma.retailerStock.updateMany({
        where: {
          retailerId: retailerUser.id,
          medicineId: item.id
        },
        data: {
          qty: { decrement: item.qty }
        }
      });
    }

    return { success: true, billId: bill.id };
  }
}
