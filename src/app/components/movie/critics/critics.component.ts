import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { CriticsmovieService } from 'src/app/services/criticsmovie.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from "moment";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    
  }
  ngOnInit(): void {
    this.islogged=this.authenticationService.islogged;
    this.criticsForm = this.formBuilder.group({
      title:['', Validators.required],
      content:['',Validators.required],
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
    if (this.criticsForm.invalid) {
      return;
  }
  let critic={...this.criticsForm.value,note:this.selected,date:moment().format('YYYY-MM-DD HH:mm:ss'), movie:this.titleOfMovie}
  let criticDuplicate=[]
  if(this.currentPage!==1){
    this.criticsService.sendInsertNewCritic(critic).subscribe(()=>{
      this.loadCriticsMovie(this.currentPage);
    })
    return 
  }
  this.authenticationService.sendGetUsername().subscribe((response:any)=>{
    critic={...critic,username:response.username};
    criticDuplicate=this.critics.slice();
    this.critics.pop();
    this.critics.unshift(critic);
    this.totalItems++;
  });
  this.criticsService.sendInsertNewCritic(critic).pipe(catchError(
    error=>{ 
      this.totalItems--;
      this.critics=criticDuplicate;
    return throwError(error);
  })).subscribe();
 };

  pageChange(newPage: number) {
    this.loadCriticsMovie(newPage);
    this.currentPage=newPage;
  }
}
