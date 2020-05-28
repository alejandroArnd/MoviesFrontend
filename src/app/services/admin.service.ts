import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpclient: HttpClient) {

  }
  public sendGetAllUsers(currentPage){
    return this.httpclient.post(environment.REST_API_SERVER+environment.ALLUSER,{'currentPage':currentPage});
  }
}
