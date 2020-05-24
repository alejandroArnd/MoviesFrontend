import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { CriticsmovieService } from 'src/app/services/criticsmovie.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-critics',
  templateUrl: './critics.component.html',
  styleUrls: ['./critics.component.scss']
})
export class CriticsComponent implements OnInit{
  @Input() titleOfMovie: string;
  selected=1;
  notesAviables=[1,2,3,4,5,6,7,8,9,10];
  islogged
  criticsForm:FormGroup;
  critics=[];
  totalItems;
  currentPage=1
  constructor(private formBuilder: FormBuilder,private criticsService:CriticsmovieService,  private authenticationService: AuthService) { 
    this.islogged=authenticationService.islogged;
  }
  ngOnInit(): void {
    console.log(this.titleOfMovie);
    this.criticsForm = this.formBuilder.group({
      title:['', Validators.required],
      content:['',Validators.required]
    })
    this.loadCriticsMovie(1);
  }

  loadCriticsMovie(newPage){
    this.criticsService.sendGetCriticsByMovieTitle(newPage,this.titleOfMovie).subscribe(
      (response: any)=>{
        this.critics=response.critics;
        this.totalItems=response.maxItems
      })
  }

  onSubmit(){
  }

  pageChange(newPage: number) {
    this.loadCriticsMovie(newPage);
    this.currentPage=newPage;
  }
}
