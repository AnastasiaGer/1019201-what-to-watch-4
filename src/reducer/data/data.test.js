import MockAdapter from 'axios-mock-adapter';
import {initialState, ActionType, reducer, Operations} from './data';
import {movieCard as movie, movies, movieReviews as reviews} from '../../utils/test-data.js';
import {createAPI} from '../../api';
import {adaptMovie} from '../../adapters/movies';

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

  it(`Reducer should check if review is sending`, () => {
    expect(reducer({
      isReviewSending: false,
    }, {
      type: ActionType.IS_LOADING_DATA,
      payload: true,
    })).toEqual({
      isReviewSending: true,
    });
  });

  it(`Reducer should check if is sending error`, () => {
    expect(reducer({
      isSendingError: false,
    }, {
      type: ActionType.IS_ERROR_DATA,
      payload: true,
    })).toEqual({
      isSendingError: true,
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
            expect(dispatch).toHaveBeenCalledTimes(1);
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
            expect(dispatch).toHaveBeenCalledTimes(1);
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
              type: ActionType.IS_LOADING_DATA,
              payload: true,
            });
          });
  });
});
