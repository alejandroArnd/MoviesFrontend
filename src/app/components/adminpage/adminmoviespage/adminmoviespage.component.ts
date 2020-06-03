import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adminmoviespage',
  templateUrl: './adminmoviespage.component.html',
  styleUrls: ['./adminmoviespage.component.scss']
})
export class AdminmoviespageComponent implements OnInit {

  displayedColumns=['id','title','photo','director','releaseDate','description','genres','actions'];
  movieForm: FormGroup;
  totalItems;
  currentPage=1;
  movies=[];
  aGenreToUpdate=false;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.movieForm=this.formBuilder.group({});
    this.loadMovies(this.currentPage);
  }

  loadMovies(newPage){
    this.adminService.sendGetAllMovies(newPage).subscribe((response:any)=>{
      this.movies=response.movies;
      this.totalItems=response.maxItems;
    })
  }
  change(event:any) {
    console.log(event.target.files);
    }

  onSubmit(formDirective: FormGroupDirective){
    if(this.movieForm.invalid){
      return;
    }
  }
  onDelete(movie){

  }

  pageChange(newPage: number) {
    this.loadMovies(newPage);
    this.currentPage=newPage;
  }

}
