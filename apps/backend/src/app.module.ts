import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalsModule } from './hospitals/hospitals.module';
import { DoctorsModule } from './doctors/doctors.module';
import { RetailerModule } from './retailer/retailer.module';
import { MedicinesModule } from './medicines/medicines.module';

@Module({
  imports: [HospitalsModule, DoctorsModule, RetailerModule, MedicinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
