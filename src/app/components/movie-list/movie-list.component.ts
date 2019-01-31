import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material";

import { Movie } from "../../models/movie.model";
import { AppState } from "../../app.state";
import { AppService } from "../../app.service";
import * as MovieActions from "../../actions/movie.actions";
import { RemoveModalComponent } from "../remove-modal/remove-modal.component";
import { MovieFormComponent } from "../movie-form/movie-form.component";

@Component({
  selector: "movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movieList$: Observable<Movie[]>;
  formDialogRef: MatDialogRef<MovieFormComponent>;
  removeDialogRef: MatDialogRef<RemoveModalComponent>;

  constructor(
    private store: Store<AppState>,
    private appSrv: AppService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.movieList$ = this.store.pipe(select("Movies"));
  }

  

  onAddEditMovie(movie: Movie,isEdit: boolean) {


    this.formDialogRef = this.dialog.open(MovieFormComponent, {
      width: "400px",
      height: "550px",
      data: {movie: movie, isEdit},
    });

  
  }

  onRemoveMovie($event, movie) {
    $event.stopPropagation();
    this.removeDialogRef = this.dialog.open(RemoveModalComponent, {
      width: "400px",
      height: "215px",
      data: movie
    });

    this.removeDialogRef.afterClosed().subscribe(selection => {
      if (selection) {
        selection === "true";
        this.store.dispatch(new MovieActions.RemoveMovie(movie.id));

        this.appSrv.openSnackBar("Movie Removed");
      }
    });
  }
}
