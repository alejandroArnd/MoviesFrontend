import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service'

@Component({
  selector: 'app-homemovies',
  templateUrl: './homemovies.component.html',
  styleUrls: ['./homemovies.component.scss']
})
export class HomemoviesComponent implements OnInit {

  movies=[];

  constructor(private moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.moviesServices.sendGetRecentMoviesRequest().subscribe((_movies:any)=>{
    console.log(_movies);
    this.movies=_movies.data;
    
    }
  )
 }

}
