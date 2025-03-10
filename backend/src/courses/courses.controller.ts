import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }
  
}