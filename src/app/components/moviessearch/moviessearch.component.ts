import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { SearchService} from '../../services/search.service';
import { SearchresultComponent } from '../searchresult/searchresult.component';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-moviessearch',
  templateUrl: './moviessearch.component.html',
  styleUrls: ['./moviessearch.component.scss']
})
export class MoviessearchComponent implements OnInit {

  isShow = true;
  genres=[];
  checked=[];
  title:string="";
  constructor(private searchService:SearchService, private router: Router) {
    
   }
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  getCheckSelected(){
    this.checked = this.genres.reduce((accum, checkbox)=>{
      if(checkbox.checked){
        accum.push(checkbox.name)
      }
      return accum
    },[]);
    const queryParams: {[k: string]: any}={
      page:1,
      title:this.title.trim(),
    }
    if(this.checked.length >0){
      queryParams.genre=this.checked;
    }
      this.router.navigate(['/search'], {queryParams:queryParams}); 
 
  }
  changeValueCheckedCheckBox(checkbox){
    const genreChange=this.genres.find(({name})=>name===checkbox.value)
    genreChange.checked=checkbox.checked;
  }

  changeValueCheckedWhenInitComponent(genreOfDataBase){

  }

  ngOnInit(): void {
    this.searchService.sendGetAllGenresRequest().subscribe((_genres:any)=>{
      this.genres=_genres.data.map(genre=>{return {'name':genre.name,'checked':false }});
      })
    }
  }

