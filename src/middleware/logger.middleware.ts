import {request, response, NextFunction} from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: typeof request, res: typeof response, next: NextFunction) {
    const startTime = Date.now();
    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      console.log(`Fast food shop: [${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${elapsedTime}ms`);
    });
    next();
  }
}