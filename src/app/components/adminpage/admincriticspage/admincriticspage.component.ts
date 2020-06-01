import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlDirective, FormGroupDirective, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

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
  currentPage=1;
  notesAviables=new Array(10);
  noteSelected=1;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criticForm=this.formBuilder.group({});
    this.loadCritics(this.currentPage);
  }

  loadCritics(newPage){
    this.adminService.sendGetAllCritics(newPage).subscribe((response:any)=>{
      this.critics=response.critics;
      this.totalItems=response.maxItems;
    })
  }
  onDelete(critic){

  }
  onSubmit(formDirective: FormGroupDirective){
    formDirective.resetForm();
  }
  pageChange(newPage: number) {
    this.loadCritics(newPage);
    this.currentPage=newPage;
  }

}
