import {initialState, ActionType, reducer} from './app-state';

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

  it(`Should return new current page`, () => {
    expect(reducer({
      currentPage: `main`,
    }, {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: `movie`,
    })).toEqual({
      currentPage: `movie`,
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
