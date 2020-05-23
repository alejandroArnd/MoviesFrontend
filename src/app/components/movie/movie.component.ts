import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  title;
  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.title=this.activatedRoute.snapshot.url[1].path.replace(new RegExp('_','g')," ");
  }

}
