import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
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


  public setSession(authResult) {
    const expiresAt = moment().add(3600,'second');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('refresh_token', authResult.refresh_token)
  } 
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('refresh_token')
  } 

  public isLoggedIn() {
    if(!localStorage.getItem("expires_at")){
      return false;
    }
    if(!moment().isBefore(this.getExpiration())){
     this.sendRefreshToken().subscribe(data=>{ 
       this.setSession(data);
      });
    }
    return true;
  }
  
  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

}
