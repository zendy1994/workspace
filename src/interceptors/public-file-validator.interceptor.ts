import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PublicFileValidatorOptions {
  allowedFileTypes: RegExp[];
  errorMessage: string;
  isFileRequired: boolean;
}

@Injectable()
export class PublicFileValidatorInterceptor implements NestInterceptor {
  constructor(private readonly options: PublicFileValidatorOptions) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const file = context.switchToHttp().getRequest().file;

    if (!file && !this.options.isFileRequired) {
      return next.handle();
    }

    if (!file && this.options.isFileRequired) {
      throw new BadRequestException('File is required.');
    }

    const fileTypeIsValid = this.options.allowedFileTypes.some((regex) =>
      regex.test(file.mimetype),
    );

    if (!fileTypeIsValid) {
      throw new BadRequestException(this.options.errorMessage);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
