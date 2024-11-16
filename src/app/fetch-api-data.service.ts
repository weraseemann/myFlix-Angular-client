import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://mymovie-ff36c9df3695.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService implements OnInit{
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit: Component has been initialized.');
  }

  public getToken(): any {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  // Get user data from local storage
  public getUserData(): any {
    const userdata = localStorage.getItem('user');
    return userdata ? JSON.parse(userdata) : null;
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get user details
  public getUser(): Observable<any> {
    const username = this.getUserData().Username;
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edit user
  public editUser(userData: {}): Observable<any> {
    return this.http
      .put(apiUrl + `users/${this.getUserData().Username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  // Delete user
  public deleteUser(): Observable<any> {
    const username = this.getUserData().Username;
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  //Get all movies
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }
  // // Get all movies
  // public getAllMovies(): Observable<any> {
  //   return this.http
  //     .get(apiUrl + 'movies', { headers: this.getHeaders() })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }
  // Get a movie by title
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  // Get director by name
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  // Get genre by name
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to user's favorites
  public addFavoriteMovie(title: string): Observable<any> {
    const username = this.getUserData().Username;
    console.log(username, title);
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${title}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.getToken(),
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  // Remove a movie from user's favorites
  public removeFavoriteMovie(title: string): Observable<any> {
    const username = this.getUserData().Username;
    return this.http
      .delete(apiUrl + `users/${username}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  //Get favorite movies
  public getFavoriteMovies(): Observable<any> {
    const username = this.getUserData().Username;
    return this.http
      .get(apiUrl + `users/${username}/movies/favorites`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
        );
  }

  // Non-typed response extraction
  public extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something unexpected happened; please try again later.')
    );
  }
}
