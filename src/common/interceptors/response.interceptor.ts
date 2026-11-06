import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../interfaces/index.js';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
        return 'Resource updated successfully';
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Success';
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    return next.handle().pipe(map((data) => { 
        if (data && typeof data === 'object' && 'success' in data && 'status' in data && 'message' in data && 'data' in data) {
            return data as ApiResponse<T>;
        }

        let finalMessage = this.getDefaultMessage(method);

        if (data && typeof data === 'object' && 'message' in data) {
            finalMessage = data.message;
            delete data.message;
        }

         if (data && typeof data === 'object' && 'data' in data) {
            data = data.data as T;
        }

        return {
        success: true,
        status: request.statusCode || 200,
        message: finalMessage, 
        data,
        date: new Date(),
        path: request.url
        }
    }));
    } 
}