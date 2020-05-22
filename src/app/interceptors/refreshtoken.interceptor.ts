import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class RefreshtokenInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = localStorage.getItem('token');

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401 && err.error.message === "Expired JWT Token"){
         this.authservice.checkIfTimeExpirationTokenIsOver()
      }
      return throwError( err );
    }));
  }
}
