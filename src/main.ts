import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './core/service/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  /** 日志 */
  app.useLogger(app.get(LoggerService))
  /** Redis */
  // app.connectMicroservice({})
  /** 微服务 */
  // @nestjs/microservices

  const config = new DocumentBuilder()
    .setTitle("清单")
    .setDescription("API文档")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000);
  
  console.log(
    "http://localhost:3000"
  )
}
bootstrap();
