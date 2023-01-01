import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PinoLogger } from 'nestjs-pino';
import { GqlResponseInterceptor } from './interceptors/graphql-response.interceptor';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (logger: PinoLogger) => new GqlResponseInterceptor(logger),
      inject: [PinoLogger]
    }
  ]
})
export class AppModule {}
