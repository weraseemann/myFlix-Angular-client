import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void { }

  logInUser() : void {
    this.fetchApiData.userLogin(this.userData).subscribe(res => {
        this.dialogRef.close();
        this.snackBar.open(`Login success, Welcom ${res.user.Username}`, "OK", {
            duration: 2000
        });
        let user = {
            ...res.user,
            id: res.user._id,
            password: this.userData.Password,
            token: res.token
        }
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["movies"]);
    }, res => {
        this.snackBar.open("Login fail", "OK", {
            duration: 2000
        })
    })
}
}