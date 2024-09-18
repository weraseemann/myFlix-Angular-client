// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MatDialogModule, HttpClientModule, UserRegistrationFormComponent],
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }
}
