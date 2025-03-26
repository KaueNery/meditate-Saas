// src/sessions/sessions.module.ts
import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { S3Service } from './s3.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, S3Service],
})
export class SessionsModule {}