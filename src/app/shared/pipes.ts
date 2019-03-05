import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'englishLettersOnly' })
export class EnglishLettersOnlyPipe implements PipeTransform {
  transform(str: string): string {
    return str.replace(/[^a-z0-9\ ]/gi, '');
  }
}

@Pipe({ name: 'filterMovies' })
export class FilterMoviesPipe implements PipeTransform {
  transform(movies: any, str: string) {
    str = str.toLowerCase();

    if (str.length > 2)
      return movies.filter(movie => movie.title.toLowerCase().includes(str));
    else
      return movies;
  }
}