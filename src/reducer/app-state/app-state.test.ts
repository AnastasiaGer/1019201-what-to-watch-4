import {initialState, ActionType, reducer} from './app-state';
import {movieCard, currentMovie} from '../../test-data';


describe(`App State Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Should return right genre when it was changed`, () => {
    expect(reducer({
      activeGenre: `All genres`,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Drama`,
    })).toEqual({
      activeGenre: `Drama`,
    });
  });

  it(`Should return new current movie`, () => {
    expect(reducer({
      currentMovie: movieCard,
    }, {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: currentMovie,
    })).toEqual({
      currentMovie,
    });
  });

  it(`Should return true in store when MoviePlayer is active`, () => {
    expect(reducer({
      isVideoPlayer: false,
    }, {
      type: ActionType.PLAY_MOVIE,
      payload: true,
    })).toEqual({
      isVideoPlayer: true
    });
  });

  it(`Should return false in store when MoviePlayer is not active`, () => {
    expect(reducer({
      isVideoPlayer: true,
    }, {
      type: ActionType.STOP_MOVIE,
      payload: false,
    })).toEqual({
      isVideoPlayer: false
    });
  });
});
