import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private httpclient: HttpClient) { }

  public sendGetRecentMoviesRequest(){
    return this.httpclient.get(environment.REST_API_SERVER+environment.RECENTMOVIES)
  }

}
