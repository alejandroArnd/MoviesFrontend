import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-detailsmovie',
  templateUrl: './detailsmovie.component.html',
  styleUrls: ['./detailsmovie.component.scss']
})
export class DetailsmovieComponent implements OnInit {
  @Input() titleOfMovie: string;
  detailsMovie;

  constructor(private searchService:SearchService,private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.searchService.sendPostDetailsMovie(this.titleOfMovie).subscribe((response:any)=>{
     this.detailsMovie=response.data;
   })
  }

}
