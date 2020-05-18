import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password:['', Validators.required]
  })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
  }
   this.authService.sendLogInUser(this.loginForm.value).subscribe(    
     data => {
       console.log(data);
      }),
    error =>{
      this.dialog.open(DialogComponent, {
        data:{
          message: error.error.message,
        },
        width: '450px',
        height: '250px',
        panelClass: 'back-dialog'
      });
    }
}

  get password(){return this.loginForm.get('password')}

}
