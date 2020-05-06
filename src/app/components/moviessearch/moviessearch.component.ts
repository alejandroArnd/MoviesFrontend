import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { SearchService} from '../../services/search.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-moviessearch',
  templateUrl: './moviessearch.component.html',
  styleUrls: ['./moviessearch.component.scss']
})
export class MoviessearchComponent implements OnInit {

  isShow = true;
  genres=[];
  checked=[];
  constructor(private searchService:SearchService) { }

 
  toggleDisplay() {
    this.isShow = !this.isShow;
    console.log(this.checked);
  }
  getCheckSelected(){
    this.checked = this.genres.reduce((accum, checkbox)=>{
      if(checkbox.checked){
        accum.push(checkbox.name)
      }
      return accum
    },[]);
    console.log(this.checked)
  }
  changeValueCheckedCheckBox(checkbox){
    const genreChange=this.genres.find(({name})=>name===checkbox.value)
    genreChange.checked=checkbox.checked;
  }

  ngOnInit(): void {
    this.searchService.sendGetAllGenresRequest().subscribe((_genres:any)=>{
      this.genres=_genres.data.map(genre=>{return {'name':genre.name,'checked':false }});
      console.log(this.genres)
      })
      this.searchService.sendPostCurrentPageRequest().subscribe((_moviesSearch:any)=>{
        console.log(_moviesSearch);
        
      })
    }
  }

