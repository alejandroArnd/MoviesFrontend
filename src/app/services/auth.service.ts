import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  islogged=false;
  constructor(private httpclient: HttpClient,  public dialog: MatDialog ) { 
  }

  public sendRegisterUserRequest(newUser){
    return this.httpclient.post(environment.REST_API_SERVER+environment.REGISTER,newUser);
  }

  public sendLogInUser(user){
    return this.httpclient.post(environment.REST_API_SERVER+environment.LOGIN,user);
  }

  public sendRefreshToken(){
    const refreshToken=localStorage.getItem('refresh_token');
    return this.httpclient.post(environment.REST_API_SERVER+environment.REFRESH_TOKEN,{'refresh_token':refreshToken});
  }


  public setSession(authResult) {
    this.islogged=true
    const expiresAt = moment().add(60,'second');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('refresh_token', authResult.refresh_token)
  } 
  public logout() {
    this.islogged=false;
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token')
  } 

  public isLoggedIn=()=> {
    if(!localStorage.getItem("expires_at")){
      return false;
    }
    this.checkIfTimeExpirationTokenIsOver();
    return true;
  }

  public checkIfTimeExpirationTokenIsOver(){
    if(!moment().isBefore(this.getExpiration())){
     return this.sendRefreshToken().pipe(share()).subscribe(data=>{ 
        this.setSession(data);
       });
     }
  }

  public openErrorDialog(error){
    const dialogRef=this.dialog.open(DialogComponent, {
      data:{
        message: error.error.message,
      },
      width: '450px',
      height: '250px',
      panelClass: 'back-dialog'
    });
  }
  
  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

}
