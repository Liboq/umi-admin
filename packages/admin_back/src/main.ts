import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './glob/exceptionFillter.service';
import { HttpStatusSuccess } from './glob/successFiltter.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpStatusSuccess()); // 全局拦截器请求成功

  await app.listen(1101);
}
bootstrap();
