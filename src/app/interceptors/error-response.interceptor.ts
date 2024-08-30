import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleErrorResponse));
};

const handleErrorResponse = (error: HttpErrorResponse) => {
  const errorResponse = `Error ${error.status}, Message: ${error.message}`;

  return throwError(() => errorResponse);
};
