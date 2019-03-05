import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { MatDialog, MatDialogRef } from "@angular/material";

import { Movie } from "../../../models/movie.model";
import { AppState } from "../../../app.state";
import { AppService } from "../../../app.service";
import * as MovieActions from "../../../actions/movie.actions";
import { RemoveModalComponent } from "../../remove-modal/remove-modal.component";
import { MovieFormComponent } from "../../movie-form/movie-form.component";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  formDialogRef: MatDialogRef<MovieFormComponent>;
  removeDialogRef: MatDialogRef<RemoveModalComponent>;
  @Input() movie: Movie;

  constructor(
    private store: Store<AppState>,
    private appSrv: AppService,
    private dialog: MatDialog,
  ) { }


  onAddEditMovie(movie: Movie, isEdit: boolean) {


    this.formDialogRef = this.dialog.open(MovieFormComponent, {
      width: "400px",
      height: "600px",
      data: { movie: movie, isEdit },
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
