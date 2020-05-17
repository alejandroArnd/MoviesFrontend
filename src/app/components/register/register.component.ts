import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog) { }

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
      
  },
  error => {
    const dialogRef = this.dialog.open(DialogComponent, {
      data:{
        message: 'Username or email alraedy exists ',
      },
      width: '450px',
      height: '250px',
      panelClass: 'back-dialog'
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
})
    }
  get email() { return this.registerForm.get('email'); }
  get password(){return this.registerForm.get('password')}
}
