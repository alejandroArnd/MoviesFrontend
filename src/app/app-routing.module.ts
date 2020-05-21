import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { DetailsmovieComponent } from './components/movie/detailsmovie/detailsmovie.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { MovieComponent } from './components/movie/movie.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomemoviesComponent},
  { path: 'search',  runGuardsAndResolvers: 'paramsOrQueryParamsChange',  component:SearchresultComponent},
  { path: 'details/:movie', component:MovieComponent},
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuardGuard]},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
