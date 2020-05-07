import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpclient: HttpClient) {

   }

  public sendGetAllGenresRequest(){
    return this.httpclient.get(environment.REST_API_SERVER+environment.GENRES)
  }

  public sendPostCurrentPageRequest(page, title,){
    return this.httpclient.post(environment.REST_API_SERVER+environment.SEARCHMOVIES,{
      'currentPage':  page,
      'title': title,
    });
  }

}
