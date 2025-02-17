import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional, if you want notifications

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar, // Optional for showing feedback
    public router: Router
  ) {
    //this.userData = JSON.parse(localStorage?.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.Password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }
  deleteUser(): void {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear(); // Remove user data from local storage
        alert("Your account has been successfully deleted.");
        this.router.navigate(["welcome"]); // Redirect to the welcome or login page
      }, (err: any) => {
        console.error(err);
        alert("An error occurred while deleting your account.");
      });
    }
  }
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      let user = JSON.parse(localStorage.getItem("user") || "");
      this.movies=res;
      this.favoriteMovies = res.filter((movie: any) => {
        return user.FavouriteMovies.includes(movie._id)
      })
    }, (err: any) => {
      console.error(err);
    });
  }

  /* getUser(): void {
    this.fetchApiData.getUserData(res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.Password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }
  } */

  // Method to remove a movie from favorites
  removeFavoriteMovie(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "");

    this.fetchApiData.removeFavoriteMovie(movie._id).subscribe(res => {
        user.FavouriteMovies = res.FavouriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        this.favoriteMovies = this.movies.filter((movie: any) => {
          return res.FavouriteMovies.includes(movie._id)

        })
    }, err => {
        console.error(err)
    })
  //   this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((response: any) => {
  //     // Remove the movie from the favoriteMovies array
  //     this.favoriteMovies = this.favoriteMovies.filter((movie) => movie !== movieTitle);

  //     // Provide feedback to the user
  //     this.snackBar.open(`${movieTitle} has been removed from your favorites`, 'OK', {
  //       duration: 2000,
  //     });
  //   }, (error) => {
  //     console.error(error);
  //     this.snackBar.open('Error: Movie could not be removed', 'OK', {
  //       duration: 2000,
  //     });
  //   });
  }
  
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}
