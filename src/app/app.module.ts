import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomemoviesComponent } from './components/homemovies/homemovies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MoviessearchComponent } from './components/moviessearch/moviessearch.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsmovieComponent } from './components/movie/detailsmovie/detailsmovie.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { RegisterComponent } from './components/register/register.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { MovieComponent } from './components/movie/movie.component';
import { CriticsComponent } from './components/movie/critics/critics.component'
import { RefreshtokenInterceptor } from './interceptors/refreshtoken.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomemoviesComponent,
    MoviessearchComponent,
    SearchresultComponent,
    DetailsmovieComponent,
    ReplacePipe,
    RegisterComponent,
    DialogComponent,
    LoginComponent,
    MovieComponent,
    CriticsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshtokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
