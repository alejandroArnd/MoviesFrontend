import { Component, OnInit, OnChanges, AfterViewInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'MoviesFrontend';
  islogged;
  constructor( private router: Router, private authenticationService: AuthService){
  }
 ngDoCheck(){
  this.islogged=this.authenticationService.isLoggedIn()
 }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}

