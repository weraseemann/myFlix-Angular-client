
// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { 
    Username: '', 
    Password: '', 
    Email: '', 
    Birthday: '' 
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }
// This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // Close the dialog on success
        this.snackBar.open('You are welcome! Please log in!', 'OK', { 
        duration: 2000 });
      },
      (result) => {
        console.log(result);
        this.snackBar.open('Something went wrong!', 'OK', { 
        duration: 2000 });
      }
    );
  }
}
