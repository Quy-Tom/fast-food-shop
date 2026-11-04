import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const startTime = Date.now();

    const request = context.switchToHttp().getRequest();

    console.log(`Request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      finalize(() => {
        const duration = Date.now() - startTime;

        console.log(`Request completed in ${duration}ms`);
      }),
    );
  }
}