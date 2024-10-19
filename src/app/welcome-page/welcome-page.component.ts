import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  // This is the function that will open the dialog when the Login button is clicked
  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }
}
