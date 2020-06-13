import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from "moment";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable()
export class RefreshtokenInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthService, private router: Router,   private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = localStorage.getItem('token');
   if(token){
    const headers_object = new HttpHeaders().set("Authorization", "Bearer " +token);
     request=request.clone({
        headers:headers_object
      }
    );
   }

    return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status === 401 && err.error.message === "Expired JWT Token"){
        return this.handle401Error(request, next);
      }
      if(err.status===404){
        this.handle404Error();
      }
      this.openErrorDialog(err)
      return throwError( err );
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(!moment().isBefore(this.authservice.getExpiration())){
    return this.authservice.sendRefreshToken().pipe(switchMap(data =>{ 
      this.authservice.setSession(data);
      return next.handle(request.clone({
        headers:new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
      })).toPromise().then(data => {
      return data; 
    });
    }))
  }
}
  private handle404Error(){
    this.router.navigateByUrl('**', {skipLocationChange:true});
  }

  public openErrorDialog(error){
    const dialogRef=this.dialog.open(DialogComponent, {
      data:{
        message: error.error.message?error.error.message:error.message,
      },
      width: '450px',
      height: '250px',
      panelClass: 'back-dialog'
    });
  }
}
