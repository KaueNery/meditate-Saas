import { Controller, Get, Post, Body } from '@nestjs/common';
import { Session } from '@prisma/client';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  @Post()
  async create(@Body() data: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(data);
  }
}