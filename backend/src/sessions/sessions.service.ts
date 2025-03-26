import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';
import { S3Service } from './s3.service';


@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    ) {}

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

  async getPresignedAudioUrl(sessionId: number): Promise<string> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.fileUrl) {
      throw new Error('Session or audio file not found');
    }

    return this.s3Service.getPresignedUrl(session.fileUrl);
  }
}