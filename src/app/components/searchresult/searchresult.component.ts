import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit, OnDestroy {
  currentPage;
  genresSelected;
  title;
  movies=[]
  totalItems
  route$:Subscription;
  constructor(private searchService:SearchService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route$=this.route.queryParamMap.subscribe( params => {
      this.currentPage=params.get('page');
      this.genresSelected=params.getAll('genre');
      this.title=params.get('title').replace("_"," ");
      this.loadSearchMovies();
    });
  }

  loadSearchMovies(){
    this.searchService.sendPostCurrentPageRequest(this.currentPage,this.title, this.genresSelected).subscribe((_moviesSearch:any)=>{
      this.movies=_moviesSearch.movies
      this.totalItems=_moviesSearch.maxItems
    })


  }
  pageChange(newPage: number) {
    const queryParams: {[k: string]: any}={
      page:newPage,
      title:this.title
    }
    if(this.genresSelected.length >0){
      queryParams.genre=this.genresSelected;
    }
    this.router.navigate(['/search'], { queryParams: queryParams });
}

ngOnDestroy(){
  this.route$.unsubscribe();
}

}
