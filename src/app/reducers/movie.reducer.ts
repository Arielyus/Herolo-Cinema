import { Movie } from "../models/movie.model";
import * as MoiveActions from "../actions/movie.actions";

export function reducer(state: Movie[] = [], action: MoiveActions.Actions) {
  switch (action.type) {
    case MoiveActions.ADD_MOVIE:
      return [...state, action.payload];

    case MoiveActions.REMOVE_MOVIE:
      return state.filter(movie => movie.id != action.id);

    case MoiveActions.UPDATE_MOVIE:
      const index = state.findIndex(function (i) {
        return i.id === action.payload.id;
      });

      const newState = state.map(movie => movie);
      newState[index] = action.payload;

      return newState;

    default:
      return state;
  }
}
