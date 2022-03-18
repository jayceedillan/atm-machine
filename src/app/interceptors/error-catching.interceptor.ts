import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExceptionIntercept implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = this.authenticationService.getToken();
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = '';
        if (error.error instanceof ErrorEvent) {
          // handle client-side error
          message = `Error: ${error.error.message}`;
        } else {
          // handle server-side error
          message = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(message);
        return throwError(message);
      })
    );
  }
}
