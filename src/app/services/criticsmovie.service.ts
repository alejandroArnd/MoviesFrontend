import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriticsmovieService {

  constructor(private httpclient: HttpClient) { 
  }

  public test(){
    const headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.httpclient.get(environment.REST_API_SERVER+'test',{headers: headers_object});
  }

  public sendGetCriticsByMovieTitle(currentPage, title){
    return this.httpclient.post(environment.REST_API_SERVER+environment.CRITICS,{'currentPage':currentPage, 'title':title});
  }
  public sendInsertNewCritic(critic, titleMovie){
    critic={...critic,movie:titleMovie}
    return this.httpclient.post(environment.REST_API_SERVER+environment.DOCRITIC,critic);
  }
}
