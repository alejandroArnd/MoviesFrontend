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
  username;
  islogged
  constructor( private router: Router, private authenticationService: AuthService){
    this.authenticationService.islogged=this.authenticationService.isLoggedIn();
    this.islogged= this.authenticationService.islogged
  }
  ngOnInit(){
    if(localStorage.getItem('token')){
      this.authenticationService.sendGetUsername().subscribe((response:any)=>{
        console.log(response);
        this.username=response.username;
      })
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.islogged=false
}
}

