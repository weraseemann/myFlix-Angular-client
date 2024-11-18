// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
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
            if (user && Array.isArray(user.FavouriteMovies)) {
              movie.isFavorite= user.FavouriteMovies.includes(movie._id);
          }})
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


  toggleFavoriteMovie(movie: any): void {
      let user = JSON.parse(localStorage.getItem("user") || "");
      let icon = document.getElementById(`${movie._id}-favorite-icon`);
      console.log(user, 'user, toggle');
      console.log(movie, 'movie, toggle');

      if (user.FavouriteMovies?.includes(movie._id)) {
          this.fetchApiData.removeFavoriteMovie(movie._id).subscribe(res => {
            movie.isFavorite = false; // Update UI state
            icon?.setAttribute("fontIcon", "favorite_border");
              console.log(`${movie.title} removed from favorites.`)
              console.log(res);
              user.FavouriteMovies = res.FavouriteMovies;
              localStorage.setItem("user", JSON.stringify(user));
          }, err => {
              console.error(err)
          })
      } else {
          
          this.fetchApiData.addFavoriteMovie(movie._id).subscribe(res => {
            movie.isFavorite = true; // Update UI state
              icon?.setAttribute("fontIcon", "favorite");
              console.log(`${movie.title} added to favorites.`)
              console.log(res);
              user.FavouriteMovies = res.FavouriteMovies;
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
              title: String(movie.genre.name).toUpperCase(),
              content: movie.genre.description
          },
          width: "400px"
      })
  }
  showDirector(movie: any): void {
      this.dialog.open(MessageBoxComponent, {
          data: {
              title: movie.director.name,
              content: movie.director.description
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