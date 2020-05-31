import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admingenrespage',
  templateUrl: './admingenrespage.component.html',
  styleUrls: ['./admingenrespage.component.scss']
})
export class AdmingenrespageComponent implements OnInit {
  displayedColumns=['id','name','actions'];
  genreForm: FormGroup;
  totalItems;
  currentPage=1;
  genres=[];
  aGenreToUpdate=false;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.genreForm=this.formBuilder.group({
      genre: ['', Validators.required],
      id:['']
    })
    this.loadGenres(this.currentPage);
  }
  loadGenres(newPage){
    this.adminService.sendGetAllGenres(newPage).subscribe((response:any)=>{
      this.genres=response.genres;
      this.totalItems=response.maxItems;
    })
  }
  onSubmit(formDirective: FormGroupDirective) {
    if (this.genreForm.invalid) {
      return;
    }
   this.adminService.sendCreateGenre(this.genreForm.value).subscribe((response:any)=>{
      const newNameGenre=this.genreForm.value.genre;
      this.totalItems++;
      formDirective.resetForm();
     if(this.currentPage!==1){
       this.loadGenres(this.currentPage)
       return;
     }
     this.genres.pop();
     this.genres=[{'id':response.id, 'name':newNameGenre},...this.genres];
    })
  }

  onDelete(genre) {
    this.adminService.sendDeleteGenre(genre.id).subscribe(()=>{
      this.loadGenres(this.currentPage);
    })
  }
  addGenretoForm(genre){
    this.genreForm.controls['genre'].setValue(genre.name)
    this.genreForm.controls['id'].setValue(genre.id);
    this.aGenreToUpdate=true;
    }

  putFormCreateGenre(formDirective: FormGroupDirective){
      this.aGenreToUpdate=false;
      formDirective.resetForm();
  }

  onUpdate(formDirective: FormGroupDirective){
    this.adminService.sendUpdateGenre(this.genreForm.value).subscribe(()=>{
    const genre=this.genres.find(genre => genre.id === this.genreForm.value.id);
    if(genre){
    genre.name=this.genreForm.value.genre;
    }
    this.putFormCreateGenre(formDirective);
    })
  }

  pageChange(newPage: number) {
    this.loadGenres(newPage);
    this.currentPage=newPage;
  }
}
