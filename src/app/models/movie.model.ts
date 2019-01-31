export class Movie {
  id: string;
  title: string;
  year: number;
  runtime: number;
  genre: string;
  director: string;

  constructor() {
    this.id = '';
    this.title = '';
    this.year = (new Date()).getFullYear();
    this.runtime = 0
    this.director = '';
    this.genre = '';
  }
}
