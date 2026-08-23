import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalsModule } from './hospitals/hospitals.module';
import { DoctorsModule } from './doctors/doctors.module';
import { RetailerModule } from './retailer/retailer.module';

@Module({
  imports: [HospitalsModule, DoctorsModule, RetailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
