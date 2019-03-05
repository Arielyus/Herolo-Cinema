import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { MatSnackBar } from "@angular/material";

import { Movie } from "./models/movie.model";
import * as MovieActions from "./actions/movie.actions";
import { AppState } from "./app.state";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";

const initMoviesList = ["the matrix", "gladiator", "interstellar", "pulp fiction", "fight club", "forrest gump",
"inception", "the silence of the lambs", "spirited away", "the departed", 
"back to the future", "terminator 2: judgment day"];
const omdbUrl = "https://www.omdbapi.com/";
@Injectable()
export class AppService {
  id = 0;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    initMoviesList.forEach(titleName => this.initMovies(titleName));
  }

  private initMovies(titleName): void {
    this.getMoiveOmdb(titleName).subscribe(
      (response: any) => {
        let movie = new Movie();
        movie.id = this.generateUniqId().toString();
        movie.genre = response.Genre;
        movie.runtime = parseInt(response.Runtime);
        movie.year = parseInt(response.Year);
        movie.title = response.Title;
        movie.director = response.Director;
        movie.poster = response.Poster;

        this.addMovie(movie);
      },
      error => console.log(error)
    );
  }

  private addMovie(Movie: Movie) {
    this.store.dispatch(new MovieActions.AddMovie(Movie));
  }

  private getMovieOmdb(searchVal) {
    return this.http.get(
      omdbUrl + "?s=" + searchVal + "&type=movie" + "&apikey=ab5aaa42"
    );
  }

  private getMoiveOmdb(title) {
    return this.http.get(omdbUrl + "?t=" + title + "&apikey=ab5aaa42");
  }

  generateUniqId() {
    return ++this.id;
  }

  openSnackBar(text: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      data: text
    });
  }
}
