import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  roleSelected='ROLE_USER';
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private authService: AuthService) {
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
  onSubmit(formDirective: FormGroupDirective) {
    if (this.createUserForm.invalid) {
      return;
  }
  const newUser={...this.createUserForm.value,'role':this.roleSelected}
  this.authService.sendRegisterUserRequest(newUser).subscribe(    
    (response:any) => {
      const newUsername=this.createUserForm.value.username;
      const newEmail=this.createUserForm.value.email;
      this.totalItems++;
      formDirective.resetForm();
     if(this.currentPage!==1){
       console.log("holaaa");
       this.loadUsers(this.currentPage)
       return;
     }
     this.users.pop();
     this.users=[{'id':response.id, 'username':newUsername,'email':newEmail,'roles':this.roleSelected},...this.users];
   })
  }
  onDelete(user){
    this.adminService.sendDeleteUser(user.id).subscribe(()=>{
      this.loadUsers(this.currentPage);
    })
  }
  pageChange(newPage: number) {
    this.loadUsers(newPage);
    this.currentPage=newPage;
  }
  get email() { return this.createUserForm.get('email'); }
  get password(){return this.createUserForm.get('password')}
}
