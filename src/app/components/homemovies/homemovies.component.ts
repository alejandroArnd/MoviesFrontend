import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service'
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-homemovies',
  templateUrl: './homemovies.component.html',
  styleUrls: ['./homemovies.component.scss']
})
export class HomemoviesComponent implements OnInit {

  movies$:Observable<any>;

  constructor(private moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.movies$=this.moviesServices.sendGetRecentMoviesRequest()
 }

}
