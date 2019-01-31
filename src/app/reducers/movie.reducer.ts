import { Movie } from "../models/movie.model";
import * as MoiveActions from "../actions/movie.actions";

export function reducer(state: Movie[] = [], action: MoiveActions.Actions) {
  switch (action.type) {
    case MoiveActions.ADD_MOVIE:
      return [...state, action.payload];

    case MoiveActions.REMOVE_MOVIE:
      state.splice(
        state.findIndex(function(i) {
          return i.id === action.id;
        }),
        1
      );
      return state;

    case MoiveActions.UPDATE_MOVIE:
      const index = state.findIndex(function(i) {
        return i.id === action.payload.id;
      });

      state[index] = action.payload;

      return state;

    default:
      return state;
  }
}
