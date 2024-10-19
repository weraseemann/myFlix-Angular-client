
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardActions } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];


@NgModule({
  declarations: [
    
    UserRegistrationFormComponent,
    LoginComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MessageBoxComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppComponent,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardActions,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule

  ],
  providers: [provideAnimationsAsync()],

})
export class AppModule { }
