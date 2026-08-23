import { Controller, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('api/hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  async findAll() {
    return this.hospitalsService.findAll();
  }
}
