import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  totalItems
  constructor(private searchService:SearchService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => {
      this.currentPage=params.get('page');
      this.genresSelected=params.getAll('genre')
      this.title=params.get('text')
      this.loadSearchMovies();
    });
  }

  loadSearchMovies(){
    this.searchService.sendPostCurrentPageRequest(this.currentPage,this.title).subscribe((_moviesSearch:any)=>{
      this.movies=Object.values(_moviesSearch.movies)
      this.totalItems=_moviesSearch.maxItems
    })

  }
  pageChange(newPage: number) {
    const queryParams: {[k: string]: any}={
      page:newPage,
      text:this.title
    }
    if(this.genresSelected.length >0){
      queryParams.genre=this.genresSelected;
    }
    this.router.navigate(['/search'], { queryParams: queryParams });
}

}
