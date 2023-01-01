import { NestFactory } from '@nestjs/core';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    const dir = 'logs';
    if (!existsSync(dir)) {
      mkdirSync(dir, {
         recursive: true
      });
      writeFile('logs/logs.out', '', (err: any) => {
        if (err) console.log(err);
      });
    }
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
