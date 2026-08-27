import { Controller, Get, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';

@Controller('api/medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get()
  async findAll(
    @Query('q') q?: string,
    @Query('categories') categories?: string,
    @Query('rx') rx?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.medicinesService.findAll(q, categories, rx, maxPrice);
  }
}
