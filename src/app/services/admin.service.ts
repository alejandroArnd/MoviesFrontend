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

  public sendDeleteUser(idUser){
    return this.httpclient.post(environment.REST_API_SERVER+environment.DELETEUSER,{'id':idUser});
  }

  public sendGetAllGenres(currentPage){
    return this.httpclient.post(environment.REST_API_SERVER+environment.ALLGENRES,{'currentPage':currentPage});
  }
  public sendCreateGenre(genre){
    return this.httpclient.post(environment.REST_API_SERVER+environment.CREATEGENRE,genre);
  }
  public sendDeleteGenre(idGenre){
    return this.httpclient.post(environment.REST_API_SERVER+environment.DELETEGENRE,{'id':idGenre});
  }
  public sendUpdateGenre(genre){
    return this.httpclient.post(environment.REST_API_SERVER+environment.UPDATEGENRE,genre);
  }
  public sendGetAllCritics(currentPage){
    return this.httpclient.post(environment.REST_API_SERVER+environment.ALLCRITICS,{'currentPage':currentPage});
  }
  public sendDeleteCritic(idCritic){
    return this.httpclient.delete(environment.REST_API_SERVER+environment.DELETECRITIC+'/'+idCritic);
  }
}
