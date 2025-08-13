import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../prisma/generated/prisma';
import { ErrorMessages } from './finance/errors';
import { PrismaClientValidationError } from '@/../prisma/generated/prisma/runtime/library';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'Internal server error',
    };

    if (exception instanceof PrismaClientValidationError) {
      const stack = exception.message.split('\n');
      responseBody.message = stack[stack.length - 1];
      // skip error throwing
      return httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P2002'
    ) {
      if (exception.message.includes('Unique constraint failed')) {
        if (Array.isArray(exception?.meta?.target)) {
          const fields = (exception?.meta?.target as any[]).join(',');
          responseBody.message = ErrorMessages.DUPLICATE_ENTRY(
            exception.meta?.modelName as any,
            fields,
          );
        }
      }
    }

    if (exception instanceof HttpException) {
      let message = exception.message;
      if (exception instanceof BadRequestException) {
        const messageObj = (exception.getResponse() as any).message;
        if (messageObj && Array.isArray(messageObj)) {
          const fields = messageObj.join(', ');
          message += ` (${fields})`;
        }
      }
      responseBody.message = message;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
