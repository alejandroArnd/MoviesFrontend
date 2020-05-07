import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {
  currentPage;
  genresSelected;
  title;
  movies=[]
  constructor(private searchService:SearchService, private route: ActivatedRoute) { 
    this.route.queryParamMap.subscribe( params => {
      this.currentPage=params.get('page');
      this.genresSelected=params.getAll('genre')
      this.title=params.get('text')
    });
  }

  ngOnInit(): void {
    this.searchService.sendPostCurrentPageRequest(this.currentPage,this.title).subscribe((_moviesSearch:any)=>{
      this.movies=Object.values(_moviesSearch.movies)
      console.log(this.movies)
    })
  }

}
