import { Action } from "@ngrx/store"
import { Movie } from '../models/movie.model';

export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";

export class AddMovie implements Action {
    readonly type = ADD_MOVIE;

    constructor(public payload: Movie) {}
}
export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIE;

    constructor(public id: string) {}
}
export class UpdateMovie implements Action {
    readonly type = UPDATE_MOVIE;

    constructor(public payload: Movie) {}
}

export type Actions = AddMovie | RemoveMovie | UpdateMovie;