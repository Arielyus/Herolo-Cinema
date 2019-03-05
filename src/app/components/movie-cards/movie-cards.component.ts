import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { Movie } from "../../models/movie.model";
import { AppState } from "../../app.state";

@Component({
  selector: 'movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {

  movieList$: Observable<Movie[]>;
  @Input() filterBy;
  
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.movieList$ = this.store.pipe(select("Movies"));
  }

}