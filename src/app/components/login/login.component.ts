import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog, private router: Router, private route : ActivatedRoute) { }

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
   this.authService.sendLogInUser(this.loginForm.value).pipe(catchError(
     error=>{
     this.authService.openErrorDialog(error);
     return throwError(error)})).subscribe(    
     (data: any) => {
       this.authService.setSession(data);
       this.authService.username=data.user
       window.location.href='/home'
       // this.router.navigate(['/home']);
      })

}

  get password(){return this.loginForm.get('password')}

}
