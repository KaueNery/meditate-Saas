import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() data: { email: string; password: string },
  ): Promise<User> {
    return this.usersService.createUser(data);
  }
}