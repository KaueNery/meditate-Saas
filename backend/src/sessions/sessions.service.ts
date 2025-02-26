import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSessionDto): Promise<Session> {
    return this.prisma.session.create({
      data: {
        title: data.title,
        duration: data.duration,
        fileUrl: data.fileUrl, // ✅ Include required field
        image: data.image,     // Optional
        userId: data.userId,
        courseId: data.courseId,
      },
    });
  }

  async findAll(): Promise<Session[]> {
    return this.prisma.session.findMany();
  }
}