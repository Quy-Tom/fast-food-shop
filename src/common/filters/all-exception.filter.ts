
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiResponse } from '../../interfaces/index.js';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string = "Error occurred";
    let error: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const exceptionResponseObj = exceptionResponse as Record<string, any>;
        message = exceptionResponseObj.message || 'An error occurred';
        
        if(Array.isArray(exceptionResponseObj.message)) {
          message = 'Invalid Data';
          error = exceptionResponseObj.message;
        }
      }
    
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Error';
      this.logger.error(`Unexpected error: ${exception}`);
    }

    const errorResponse: ApiResponse<any> = {
      success: false,
      status,
      message,
      ...(error && {error}),
      date: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }),
      path: request.url
    };

    response.status(status).json(errorResponse);
  }
}
