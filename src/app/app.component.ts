import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Movie } from './models/movie.model';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Herolo-Cinema';
  viewMode = "cards-horizontal";
  formDialogRef: MatDialogRef<MovieFormComponent>;
  
  constructor(private dialog: MatDialog){};
  
  onAddEditMovie(movie: Movie,isEdit: boolean) {


    this.formDialogRef = this.dialog.open(MovieFormComponent, {
      width: "400px",
      height: "600px",
      data: {movie: movie, isEdit},
    });

  
  }
}
