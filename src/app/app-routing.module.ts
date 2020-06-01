import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { MovieComponent } from './components/movie/movie.component';
import { Pagenotfound404Component } from './components/pagenotfound404/pagenotfound404.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { AdminuserspageComponent } from './components/adminpage/adminuserspage/adminuserspage.component'
import { AdminGuard } from './guard/admin.guard';
import { AdmingenrespageComponent } from './components/adminpage/admingenrespage/admingenrespage.component';
import { AdmincriticspageComponent } from './components/adminpage/admincriticspage/admincriticspage.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomemoviesComponent},
  { path: 'search',  runGuardsAndResolvers: 'paramsOrQueryParamsChange',  component:SearchresultComponent},
  { path: 'details/:movie', component:MovieComponent},
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuardGuard]},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuardGuard]},
  { path: 'admin', canActivate:[AdminGuard], component:AdminpageComponent, children:[
    {
      path:'users',
      component:AdminuserspageComponent
    },
    {
      path:'genres',
      component:AdmingenrespageComponent
    },
    {
      path:'critics',
      component:AdmincriticspageComponent
    }
  ]},
  { path: '**', component:Pagenotfound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
