import { Component, OnInit } from '@angular/core';
import { SearchService} from '../../services/search.service';

@Component({
  selector: 'app-moviessearch',
  templateUrl: './moviessearch.component.html',
  styleUrls: ['./moviessearch.component.scss']
})
export class MoviessearchComponent implements OnInit {

  isShow = true;
  genres=[];
  constructor(private searchService:SearchService) { }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
    this.searchService.sendGetAllGenresRequest().subscribe((_genres:any)=>{
      this.genres=_genres.data;
      })
      this.searchService.sendPostCurrentPageRequest().subscribe((_moviesSearch:any)=>{
        console.log(_moviesSearch);
        
      })
    }
  }

