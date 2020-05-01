import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private  REST_API_SERVER = 'http://vps722937.ovh.net:8000/'

  constructor( private httpclient: HttpClient) { }

  public sendGetRecentMoviesRequest(){
    return this.httpclient.get(this.REST_API_SERVER+'recentmovies')
  }

}
