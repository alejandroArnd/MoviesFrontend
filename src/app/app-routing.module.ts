import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomemoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
