import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1.0');

  const options = new DocumentBuilder()
    .setTitle('Hello World')
    .setDescription('API Description')
    .setVersion('1.0')
    .addServer('/v1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
     ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/v1.0/ui', app, document);
  
  await app.listen(9090);
}
bootstrap();
