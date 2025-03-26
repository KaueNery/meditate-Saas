import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: { email: string }): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get()
  async findAll(): Promise<User[]> {
    console.log("INSIDE GET");
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

}
