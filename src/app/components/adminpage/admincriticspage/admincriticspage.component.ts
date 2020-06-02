import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlDirective, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { CriticsmovieService } from 'src/app/services/criticsmovie.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admincriticspage',
  templateUrl: './admincriticspage.component.html',
  styleUrls: ['./admincriticspage.component.scss']
})
export class AdmincriticspageComponent implements OnInit {
  critics=[];
  displayedColumns=['id','title','note','content','date','username','movie','actions']
  criticForm: FormGroup;
  hide = true;
  totalItems;
  filteredMovie:Observable<any[]>;
  currentPage=1;
  notesAviables=[1,2,3,4,5,6,7,8,9,10]; 
  noteSelected=1;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private moviesService: MoviesService, private criticService: CriticsmovieService, private authenticationService: AuthService) {
    this.criticForm=this.formBuilder.group({
      title:['', Validators.required],
      content:['',Validators.required],
      movie:['',Validators.required]
    });
   }

  ngOnInit(): void {
    this.filteredMovie=this.criticForm.controls['movie'].valueChanges.pipe(
      startWith(''),
      switchMap(value => this.doFilter(value))
    )
    this.loadCritics(this.currentPage);
  }

  doFilter(value){
    return this.moviesService.sendAutocompletMovies(value)
    .pipe(map((results:any) => results.movies))
  }

  loadCritics(newPage){
    this.adminService.sendGetAllCritics(newPage).subscribe((response:any)=>{
      this.critics=response.critics;
      this.totalItems=response.maxItems;
    })
  }
  onDelete(critic){
    this.adminService.sendDeleteCritic(critic.id).subscribe(()=>{
      this.loadCritics(this.currentPage);
    });
  }
  onSubmit(formDirective: FormGroupDirective){
    if(this.criticForm.invalid){
      return;
    }
    let critic={...this.criticForm.value,note:this.noteSelected,date:moment().format('YYYY-MM-DD HH:mm:ss')}
    this.authenticationService.sendGetUsername().subscribe((response:any)=>{
      critic={...critic,username:response.username};
    })
    this.criticService.sendInsertNewCritic(critic).subscribe((response:any)=>{
      this.totalItems++;
      formDirective.resetForm();
      if(this.currentPage!==1){
        this.loadCritics(this.currentPage);
        return;
      }
        this.critics.pop();
        this.critics=[{id:response.id,...critic},...this.critics];
       })
  }
  pageChange(newPage: number) {
    this.loadCritics(newPage);
    this.currentPage=newPage;
  }

}
