import MockAdapter from 'axios-mock-adapter';
import {initialState, ActionType, reducer, Operations} from './data';
import {movieCard as movie, movies, movieReviews as reviews} from '../../utils/test-data.js';
import {createAPI} from '../../api';
import {adaptMovie} from '../../adapters/movie';

const api = createAPI(() => {});

describe(`Data Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update MovieCard by load`, () => {
    expect(reducer({
      movieCard: {},
    }, {
      type: ActionType.LOAD_MOVIE_CARD,
      payload: movie,
    })).toEqual({
      movieCard: movie,
    });
  });

  it(`Reducer should update movies by load`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    })).toEqual({
      movies,
    });
  });

  it(`Reducer should update reviews by load`, () => {
    expect(reducer({
      movieReviews: [],
    }, {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: reviews,
    })).toEqual({
      movieReviews: reviews,
    });
  });

  it(`Reducer should catch error on load fail`, () => {
    expect(reducer({
      isLoadError: false,
    }, {
      type: ActionType.CATCH_LOAD_ERROR,
      payload: true,
    })).toEqual({
      isLoadError: true,
    });
  });

  it(`Reducer should check if review is sending`, () => {
    expect(reducer({
      isDataSending: false,
    }, {
      type: ActionType.CHECK_IS_DATA_SENDING,
      payload: true,
    })).toEqual({
      isDataSending: true,
    });
  });

  it(`Reducer should check if review sending was successfull`, () => {
    expect(reducer({
      isDispatchSuccessful: false,
    }, {
      type: ActionType.CHECK_IS_DISPATCH_SUCCESSFUL,
      payload: true,
    })).toEqual({
      isDispatchSuccessful: true,
    });
  });

  it(`Reducer should check if is sending error`, () => {
    expect(reducer({
      isDispatchError: false,
    }, {
      type: ActionType.CHECK_IS_DISPATCH_ERROR,
      payload: true,
    })).toEqual({
      isDispatchError: true,
    });
  });

  it(`Reducer should clear sending error`, () => {
    expect(reducer({
      isDispatchError: true,
    }, {
      type: ActionType.CLEAR_SENDING_ERROR,
      payload: false,
    })).toEqual({
      isDispatchError: false,
    });
  });

  it(`Reducer should add favorite movies to store`, () => {
    expect(reducer({
      favoriteMovies: [],
    }, {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: movies,
    })).toEqual({
      favoriteMovies: movies,
    });
  });

  it(`Reducer should finish loading`, () => {
    expect(reducer({
      isLoading: true,
    }, {
      type: ActionType.FINISH_LOADING,
      payload: false,
    })).toEqual({
      isLoading: false,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieCardLoader = Operations.loadMovieCard();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return movieCardLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_MOVIE_CARD,
              payload: adaptMovie({fake: true}),
            });
          });
  });

  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operations.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_MOVIES,
              payload: [adaptMovie({fake: true})],
            });
          });
  });

  it(`Should make a correct API call to /comments/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operations.loadMovieReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_MOVIE_REVIEWS,
              payload: [{fake: true}],
            });
          });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operations.loadFavoriteMovies();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoriteMoviesLoader(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_FAVORITE_MOVIES,
              payload: [adaptMovie({fake: true})],
            });
          });
  });

  it(`Should send review to /comments/1`, () => {
    const review = {
      rating: 5,
      comment: ``,
    };

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const pushReview = Operations.pushReview(1, review);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return pushReview(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.CHECK_IS_DATA_SENDING,
              payload: true,
            });
          });
  });

  it(`Should send favorite movie status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const sendMovieStatus = Operations.changeIsMovieFavorite(1, true);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, [{fake: true}]);

    return sendMovieStatus(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.CHECK_IS_DATA_SENDING,
              payload: false,
            });
          });
  });
});
