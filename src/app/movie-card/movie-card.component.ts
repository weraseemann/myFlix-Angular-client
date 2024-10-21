// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule, MatCardActions } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
      public fetchApiData: FetchApiDataService,
      public router: Router,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.getMovies();
  }

  getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe(res => {
          this.movies = res;

          let user = JSON.parse(localStorage.getItem("user") || "");
          this.movies.forEach((movie: any) => {
              movie.isFavorite = user.favoriteMovies.includes(movie._id);
          })
          return this.movies;
      }, err => {
          console.error(err)
      })
  }

  logout(): void {
      this.router.navigate(["welcome"]);
      localStorage.removeItem("user");
  }

  redirectProfile(): void {
      this.router.navigate(["profile"]);
  }

  modifyFavoriteMovies(movie: any): void {
      let user = JSON.parse(localStorage.getItem("user") || "");
      let icon = document.getElementById(`${movie._id}-favorite-icon`);

      if (user.favoriteMovies.includes(movie._id)) {
          this.fetchApiData.removeFavoriteMovie(movie.title).subscribe(res => {
              icon?.setAttribute("fontIcon", "favorite_border");

              console.log("del success")
              console.log(res);
              user.favoriteMovies = res.favoriteMovies;
              localStorage.setItem("user", JSON.stringify(user));
          }, err => {
              console.error(err)
          })
      } else {
          
          this.fetchApiData.addFavoriteMovie(movie.title).subscribe(res => {
              icon?.setAttribute("fontIcon", "favorite");
              console.log("add success")
              console.log(res);
              user.favoriteMovies = res.favoriteMovies;
              localStorage.setItem("user", JSON.stringify(user));
          }, err => {
              console.error(err)
          })
      }
      localStorage.setItem("user", JSON.stringify(user));
  }

  showGenre(movie: any): void {
      this.dialog.open(MessageBoxComponent, {
          data: {
              title: String(movie.genre.type).toUpperCase(),
              content: movie.genre.description
          },
          width: "400px"
      })
  }
  showDirector(movie: any): void {
      this.dialog.open(MessageBoxComponent, {
          data: {
              title: movie.director.name,
              content: movie.genre.description
          },
          width: "400px"
      })
  }
  showDetail(movie: any): void {
      this.dialog.open(MessageBoxComponent, {
          data: {
              title: movie.title,
              content: movie.description
          },
          width: "400px"
      })
  }
}