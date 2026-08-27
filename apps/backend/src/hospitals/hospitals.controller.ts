import { Controller, Get, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('api/hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  async findAll(@Query('city') city?: string, @Query('q') q?: string) {
    return this.hospitalsService.findAll(city, q);
  }
}
