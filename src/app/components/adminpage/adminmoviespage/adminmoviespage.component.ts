import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

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


  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.movieForm=this.formBuilder.group({
      image:['',Validators.required],
    });
    this.loadMovies(this.currentPage);
  }

  loadMovies(newPage){
    this.adminService.sendGetAllMovies(newPage).subscribe((response:any)=>{
      this.movies=response.movies;
      this.totalItems=response.maxItems;
    })
  }
  onFileChange(event) {
     let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.movieForm.controls['image'].setValue(reader.result);
    }
    }

  onSubmit(formDirective: FormGroupDirective){
    if(this.movieForm.invalid){
      return;
    }
  }
  onDelete(movie){

  }
  onClick(){
    this.fileInput.nativeElement.click()
  }

  pageChange(newPage: number) {
    this.loadMovies(newPage);
    this.currentPage=newPage;
  }

}
