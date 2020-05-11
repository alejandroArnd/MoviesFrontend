import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { DetailsmovieComponent } from './components/detailsmovie/detailsmovie.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomemoviesComponent},
  { path: 'search',  runGuardsAndResolvers: 'paramsOrQueryParamsChange',  component:SearchresultComponent},
  { path: 'details/:movie', component:DetailsmovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
