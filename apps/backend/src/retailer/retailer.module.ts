import { Module } from '@nestjs/common';
import { RetailerController } from './retailer.controller';
import { RetailerService } from './retailer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RetailerController],
  providers: [RetailerService, PrismaService],
})
export class RetailerModule {}
