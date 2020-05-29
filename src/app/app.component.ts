import { Component, OnInit, OnChanges, AfterViewInit, DoCheck, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'MoviesFrontend';
  username;
  islogged;
  isAdmin=false;
  selectedLang='en';
  constructor( private router: Router, private authenticationService: AuthService, private transalocoService:TranslocoService){
    this.authenticationService.islogged=this.authenticationService.isLoggedIn();
    this.islogged= this.authenticationService.islogged
  }
  ngOnInit(){
    if(localStorage.getItem('token')){
      this.authenticationService.sendGetUsername().subscribe((response:any)=>{
        console.log(response);
        this.username=response.username;
      })
      this.authenticationService.isUserLoggedAdmin().subscribe((data:any)=>{
        this.authenticationService.roles=data.roles;
        this.isAdmin=data.roles.includes('ROLE_ADMIN');
      })
    }
  }

  selectLanguage(language:string=this.selectedLang){
    this.transalocoService.setActiveLang(language);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.islogged=false;
    this.isAdmin=false;
}
}

