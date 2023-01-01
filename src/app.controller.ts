import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

export type Post = {
  id: number;
  name: string;
};

@Controller()
export class AppController {
  @UseInterceptors(LoggingInterceptor)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @UseInterceptors(TransformInterceptor<Post>)
  @Get('posts')
  getPosts(): Post[] {
    return [
      { id: 1, name: 'post1' },
      { id: 2, name: 'post2' }
    ];
  }

  @UseInterceptors(ErrorsInterceptor)
  @Get('errors')
  returnError() {
    throw new Error('Error!');
  }

  @UseInterceptors(CacheInterceptor)
  @Get('cache')
  chacheError() {
    throw new Error('Error!');
  }

  @UseInterceptors(TimeoutInterceptor)
  @Get('timeout')
  timeout() {  }
}
