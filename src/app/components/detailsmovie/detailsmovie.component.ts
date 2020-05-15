import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-detailsmovie',
  templateUrl: './detailsmovie.component.html',
  styleUrls: ['./detailsmovie.component.scss']
})
export class DetailsmovieComponent implements OnInit {
  detailsMovie;

  constructor(private searchService:SearchService,private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   const titleOfMovie=this.activatedRoute.snapshot.url[1].path.replace(new RegExp('_','g')," ");
   console.log(titleOfMovie);
   this.searchService.sendPostDetailsMovie(titleOfMovie).subscribe((response:any)=>{
     this.detailsMovie=response.data;
   })
  }

}
