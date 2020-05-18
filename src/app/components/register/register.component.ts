import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['', [Validators.required, Validators.minLength(8)]]
  });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
  }
  
   this.authService.sendRegisterUserRequest(this.registerForm.value).subscribe(    
     data => {
      this.router.navigate(['/login']);
    },
    error => {
     this.dialog.open(DialogComponent, {
      data:{
        message: error.error.message,
      },
      width: '450px',
      height: '250px',
      panelClass: 'back-dialog'
    }); 
   })
  }
  get email() { return this.registerForm.get('email'); }
  get password(){return this.registerForm.get('password')}
}
