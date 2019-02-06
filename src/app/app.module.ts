import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule, MatInputModule, MatNativeDateModule, MatRippleModule } from '@angular/material';
import {MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ScrollDispatchModule} from '@angular/cdk/scrolling'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AppService } from './app.service';
import { reducer as reducer } from './reducers/movie.reducer';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { EnglishLettersOnlyPipe } from './shared/pipes';
import { MovieCardsComponent } from './components/movie-cards/movie-cards.component';
import { MovieCardsHorizontalComponent } from './components/movie-cards-horizontal/movie-cards-horizontal.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    RemoveModalComponent,
    MovieFormComponent,
    SnackbarComponent,
    EnglishLettersOnlyPipe,
    MovieCardsComponent,
    MovieCardsHorizontalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatGridListModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    StoreModule.forRoot({
      Movies: reducer
    })
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [RemoveModalComponent, MovieFormComponent, SnackbarComponent]
})
export class AppModule { }
