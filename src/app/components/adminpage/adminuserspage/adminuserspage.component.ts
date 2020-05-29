import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminuserspage',
  templateUrl: './adminuserspage.component.html',
  styleUrls: ['./adminuserspage.component.scss']
})
export class AdminuserspageComponent implements OnInit {

  users=[];
  displayedColumns=['id','username','roles','email','actions']
  createUserForm: FormGroup;
  hide = true;
  totalItems;
  currentPage=1;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.createUserForm=this.formBuilder.group({
      username: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['', [Validators.required, Validators.minLength(8)]]
  });
  this.loadUsers(this.currentPage);
  }
  loadUsers(newPage){
    this.adminService.sendGetAllUsers(newPage).subscribe((response:any)=>{
      this.users=response.users;
      this.totalItems=response.maxItems;
    })
  }
  onSubmit() {
  }
  onDelete(user){
    console.log(user)
  }
  pageChange(newPage: number) {
    this.loadUsers(newPage);
    this.currentPage=newPage;
  }
  get email() { return this.createUserForm.get('email'); }
  get password(){return this.createUserForm.get('password')}
}
