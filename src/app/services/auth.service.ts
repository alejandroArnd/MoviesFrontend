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
  username;
  roles;
  constructor(private httpclient: HttpClient ) { 
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

  public sendGetUsername(){
    return this.httpclient.get(environment.REST_API_SERVER+environment.USERNAME)
  }

  public sendGetRoles(){
    return this.httpclient.get(environment.REST_API_SERVER+environment.GETROLES)
  }


  public setSession(authResult) {
    this.islogged=true
    const expiresAt = moment().add(3600,'second');
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
    if(!localStorage.getItem("expires_at") && !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  public isUserLoggedAdmin(){
    return this.sendGetRoles()
  }
/*
  public checkIfTimeExpirationTokenIsOver(){
    if(!moment().isBefore(this.getExpiration())){
      this.sendRefreshToken().pipe(share()).subscribe(data=>{ 
        this.setSession(data);
       });
     }
  }
  */

  
  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

}
