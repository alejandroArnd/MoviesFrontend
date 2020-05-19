import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoviesFrontend';
  authservice;
  constructor( private router: Router, private authenticationService: AuthService){
    this.authservice=authenticationService
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}

