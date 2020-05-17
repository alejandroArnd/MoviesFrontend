import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  public sendRegisterUserRequest(newUser){
    return this.httpclient.post(environment.REST_API_SERVER+environment.REGISTER,newUser);
  }
}
