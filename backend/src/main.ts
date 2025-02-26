import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enhanced CORS configuration
    app.enableCors({
      origin: [
        'http://localhost:8081',
        'http://192.168.1.6:19000',
        'exp://192.168.1.6:19000',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    });

    await app.listen(3000);
    console.log(`🚀 Server running on http://localhost:3000`);
  } catch (error) {
    console.error('🔥 Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();