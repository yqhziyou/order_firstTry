import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 启用自动转换
    whitelist: true, // 删除未声明的属性
    forbidNonWhitelisted: true, // 如果有未声明属性，抛出错误
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
