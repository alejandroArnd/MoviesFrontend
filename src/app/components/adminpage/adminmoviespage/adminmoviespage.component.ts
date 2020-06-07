import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { SearchService } from 'src/app/services/search.service';
import  * as moment from 'moment';

@Component({
  selector: 'app-adminmoviespage',
  templateUrl: './adminmoviespage.component.html',
  styleUrls: ['./adminmoviespage.component.scss']
})
export class AdminmoviespageComponent implements OnInit {
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;

  displayedColumns=['id','title','photo','director','releaseDate','description','genres','actions'];
  movieForm: FormGroup;
  totalItems;
  currentPage=1;
  movies=[];
  aGenreToUpdate=false;
  imgURL;
  genres=[];
  aMovieToUpdate=false;

  constructor(private adminService: AdminService, private searchService:SearchService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.movieForm=this.formBuilder.group({
      id:[''],
      title:['',Validators.required],
      director:['',Validators.required],
      description:['',Validators.required],
      date:['',[Validators.required]],
      image:[''],
      genres:['',Validators.required],
    });
    this.loadMovies(this.currentPage);
    this.loadGenres();
  }

  loadMovies(newPage){
    this.adminService.sendGetAllMovies(newPage).subscribe((response:any)=>{
      this.movies=response.movies;
      this.totalItems=response.maxItems;
    })
  }

  loadGenres(){
    this.searchService.sendGetAllGenresRequest().subscribe((response:any)=>{
      this.genres=response.data  
    })
  }

  onFileChange(event) {
     let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.movieForm.controls['image'].setValue(this.imgURL.split(',')[1]);
    }
    }

  onSubmit(formDirective: FormGroupDirective){
    if(this.movieForm.invalid){
      return;
    }
    this.movieForm.controls['date'].setValue(moment(this.movieForm.controls['date'].value).format('YYYY-MM-DD HH:mm:ss'));
    this.adminService.sendCreateMovie(this.movieForm.value).subscribe(()=>{
     formDirective.resetForm();
     this.imgURL="";
     this.loadMovies(this.currentPage);
    })
  }
  onSetMovieInForm(movie){
    this.movieForm.controls['id'].setValue(movie.id);
    this.movieForm.controls['title'].setValue(movie.title);
    this.imgURL=movie.photo;
    this.movieForm.controls['description'].setValue(movie.description);
    this.movieForm.controls['director'].setValue(movie.director);
    let dateMovie=new Date(movie.releaseDate);
    dateMovie.setHours(0,0,0)
    this.movieForm.controls['date'].setValue(dateMovie);
    let genresChecked=movie.genres.map((genre)=>genre.name);
    this.movieForm.controls['genres'].setValue(genresChecked);
    this.aMovieToUpdate=true;
  }
  putFormCreateMovie(formDirective: FormGroupDirective){
    this.aMovieToUpdate=false;
    this.imgURL="";
    formDirective.resetForm();
}

  onUpdate(formDirective: FormGroupDirective){
    if(this.movieForm.invalid){
      return;
    }
    this.movieForm.controls['date'].setValue(moment(this.movieForm.controls['date'].value).format('YYYY-MM-DD HH:mm:ss'));
    console.log(this.movieForm.value);
    this.adminService.sendUpdateMovie(this.movieForm.value).subscribe(()=>{
      this.loadMovies(this.currentPage);
      this.putFormCreateMovie(formDirective);
    })
  }
  onDelete(movie){
    this.adminService.sendDeleteMovie(movie.id).subscribe(()=>{
      this.loadMovies(this.currentPage);
    })
  }
  onClick(){
    this.fileInput.nativeElement.click()
  }

  pageChange(newPage: number) {
    this.loadMovies(newPage);
    this.currentPage=newPage;
  }

}
