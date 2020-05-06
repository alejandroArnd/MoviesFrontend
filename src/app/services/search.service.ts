import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpclient: HttpClient) { }

  public sendGetAllGenresRequest(){
    return this.httpclient.get(environment.REST_API_SERVER+environment.GENRES)
  }

  public sendPostCurrentPageRequest(){
    return this.httpclient.post(environment.REST_API_SERVER+environment.SEARCHMOVIES,{
      'currentPage':  1,
      'title': 'La',
    });
  }
}
