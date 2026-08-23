import { Controller, Get, Post, Body } from '@nestjs/common';
import { RetailerService } from './retailer.service';

@Controller('api/retailer')
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  @Get('stock')
  async getStock() {
    return this.retailerService.getStock();
  }

  @Post('billing')
  async processBilling(@Body() body: { cart: any[], doctorName: string }) {
    return this.retailerService.processBilling(body.cart, body.doctorName);
  }
}
