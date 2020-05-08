import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomemoviesComponent},
  { path: 'search',  runGuardsAndResolvers: 'paramsOrQueryParamsChange',  component:SearchresultComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
