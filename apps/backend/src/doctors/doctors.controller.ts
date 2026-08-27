import { Controller, Get, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('api/doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async findAll(@Query('q') q?: string, @Query('city') city?: string) {
    return this.doctorsService.findAll(q, city);
  }
}
