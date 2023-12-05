import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap, Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

// eslint-disable-next-line no-process-env
newrelic.addCustomAttribute('client', process.env.CLIENT_NAME || 'tymlez');

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return newrelic.startWebTransaction(context.getHandler().name, () => {
      const transaction = newrelic.getTransaction();

      return next.handle().pipe(
        tap(() => {
          return transaction.end();
        }),
      );
    });
  }
}
