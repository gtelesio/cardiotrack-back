import { appConfig } from '@config/application.config';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '@shared/enums/errors.enum';
import { Response } from 'express';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  public catch(exception: HttpException | Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionBody = exception.getResponse();

      if (!exceptionBody['message']) {
        return this.dispatchInternalServerErrorResponse(exception, response);
      }

      const message = exceptionBody['message'];
      const exceptionResponse = Array.isArray(message)
        ? message.map(message => ({ message }))
        : [{ message }];

      return response.status(status).json({
        status,
        errors: exceptionResponse,
        ...(appConfig.isDevelopment && { stack: exception.stack }),
      });
    }

    return this.dispatchInternalServerErrorResponse(exception, response);
  }

  private dispatchInternalServerErrorResponse(exception: Error, response: Response): Response {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      errors: [
        {
          message: ERRORS.SOMETHING_WENT_WRONG,
        },
      ],
      ...(appConfig.isDevelopment && { stack: exception.stack }),
    });
  }
}
