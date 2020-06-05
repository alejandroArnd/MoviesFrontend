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
    return this.httpclient.delete(environment.REST_API_SERVER+environment.DELETEUSER+'/'+idUser);
  }

  public sendGetAllGenres(currentPage){
    return this.httpclient.post(environment.REST_API_SERVER+environment.ALLGENRES,{'currentPage':currentPage});
  }
  public sendCreateGenre(genre){
    return this.httpclient.post(environment.REST_API_SERVER+environment.CREATEGENRE,genre);
  }
  public sendDeleteGenre(idGenre){
    return this.httpclient.delete(environment.REST_API_SERVER+environment.DELETEGENRE+'/'+idGenre);
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
  public sendGetAllMovies(currentPage){
    return this.httpclient.post(environment.REST_API_SERVER+environment.ALLMOVIES,{'currentPage':currentPage});
  }
  public sendCreateMovie(movie){
    return this.httpclient.post(environment.REST_API_SERVER+environment.CREATEMOVIE,movie);
  }
}
