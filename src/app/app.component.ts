import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AppService } from './app.service';
import { Movie } from './models/movie.model';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { map, filter, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Herolo-Cinema';
  viewMode = "cards-horizontal";
  formDialogRef: MatDialogRef<MovieFormComponent>;
  movieList$: Observable<Movie[]>;

  constructor(
    private dialog: MatDialog,
    private appSrv: AppService,
    private store: Store<AppState>) { };

  ngOnInit(): void {
    this.movieList$ = this.store.select("Movies");
  }


  onAddEditMovie(movie: Movie, isEdit: boolean, ) {
    this.formDialogRef = this.dialog.open(MovieFormComponent, {
      width: "400px",
      height: "600px",
      data: { movie: movie, isEdit },
    });
  }
}
