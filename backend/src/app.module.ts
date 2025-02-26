// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module'; // Import PrismaModule
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // ✅ Add PrismaModule here
    AuthModule,
    SessionsModule,
    CoursesModule,
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}