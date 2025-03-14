import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string }): Promise<User> {
    return this.prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: { email: data.email }
    });
  }
}
