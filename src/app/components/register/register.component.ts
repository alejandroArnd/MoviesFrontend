import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['', [Validators.required, Validators.minLength(8)]]
  });
  }

  onSubmit() {
    console.log(this.registerForm.value)

    if (this.registerForm.invalid) {
      return;
  }
  
   this.authService.sendRegisterUserRequest(this.registerForm.value).subscribe(    
     data => {
  },
  error => {
    this._snackBar.open('Username or email already exist','Close', {
      duration: 10000,
      panelClass: ['warning-snackbar']
    });
})
    }
  get email() { return this.registerForm.get('email'); }
  get password(){return this.registerForm.get('password')}
}
