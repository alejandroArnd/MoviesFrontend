import { Component, OnInit, OnChanges, AfterViewInit, DoCheck, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'MoviesFrontend';
  authService
  constructor( private router: Router, private authenticationService: AuthService){
    this.authenticationService.islogged=this.authenticationService.isLoggedIn();
    this.authService=this.authenticationService;
  }
  ngOnInit(){
    if(localStorage.getItem('token')){
      this.authenticationService.sendGetUsername().subscribe((response:any)=>{
        this.authenticationService.username=response.username;
      })
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}

