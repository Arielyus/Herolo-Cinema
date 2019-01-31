import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";

import { AppState } from "src/app/app.state";
import * as MovieActions from "../../actions/movie.actions";
import { Movie } from "src/app/models/movie.model";
import { AppService as AppService } from "src/app/app.service";
import { stringExistsValidator } from "src/app/shared/validators";

@Component({
  selector: "app-movie-form",
  templateUrl: "./movie-form.component.html",
  styleUrls: ["./movie-form.component.css"]
})
export class MovieFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movie: Movie; isEdit: boolean },
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<MovieFormComponent>,
    private appSrv: AppService
  ) {}

  ngOnInit() {
    let movieTitles: string[];
    this.data.movie = this.data.isEdit ? this.data.movie : new Movie();
    this.store.select("Movies")
      .subscribe(movies => (movieTitles = movies.map(movie => movie.title)));

    if(this.data.isEdit)
      movieTitles.splice( movieTitles.indexOf(this.data.movie.title), 1 );
    
    this.formGroup = this.formBuilder.group({
      id: new FormControl({ value: this.data.movie.id, disabled: true }),
      title: [
        this.data.movie.title,
        [Validators.required, stringExistsValidator(movieTitles)]
      ],
      year: [
        this.data.movie.year,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(2100),
          Validators.pattern(/^[0-9]*$/)
        ]
      ],
      director: [this.data.movie.director, Validators.required],
      genre: [this.data.movie.genre, Validators.required],
      runtime: [
        this.data.movie.runtime,
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ]
    });
  }

  onSubmit() {
    let movie = new Movie();
    movie = {
      genre: this.formGroup.get("genre").value,
      title: this.formGroup.get("title").value,
      id: this.data.isEdit? this.data.movie.id : this.appSrv.generateUniqId().toString(),
      runtime: this.formGroup.get("runtime").value,
      year: this.formGroup.get("year").value,
      director: this.formGroup.get("director").value
    };

    if (this.data.isEdit)
      this.store.dispatch(new MovieActions.UpdateMovie(movie));
    else this.store.dispatch(new MovieActions.AddMovie(movie));

    this.appSrv.openSnackBar("Movie Saved");
    this.dialogRef.close();
  }

  
  
}
