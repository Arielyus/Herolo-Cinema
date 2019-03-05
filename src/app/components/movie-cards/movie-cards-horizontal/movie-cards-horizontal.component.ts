import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { Movie } from "../../../models/movie.model";
import { AppState } from "../../../app.state";


@Component({
  selector: 'movie-cards-horizontal',
  templateUrl: './movie-cards-horizontal.component.html',
  styleUrls: ['./movie-cards-horizontal.component.css']
})
export class MovieCardsHorizontalComponent implements OnInit {
  movieList$: Observable<Movie[]>;
  @ViewChild("scroll") scroll: ElementRef;
  @Input() filterBy;


  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.movieList$ = this.store.pipe(select("Movies"));
  }


  onScroll(direction){
    let scrollVal = direction === 'left' ? -334 : 334;
    this.scroll.nativeElement.scrollBy({top:0, left:scrollVal, behavior: 'smooth'})
  }
  
}
