import {extend} from '../../utils/utils';
import {adaptMovie} from '../../adapters/movies';
import {ActionCreator as AppStateActionCreator} from '../app-state/app-state';

const emptyMovie = {
  title: `Loading...`,
  genre: ``,
  date: 0,
  background: ``,
  poster: ``,
  id: 0,
  description: ``,
  rating: 0,
  votes: 0,
  director: ``,
  starring: [],
  runTime: 0,
  preview: ``,
  videoLink: ``,
  isFavorite: false,
  backgroundColor: ``,
};

const initialState = {
  movieCard: emptyMovie,
  movies: [],
  movieReviews: [],
  isReviewSending: false,
  isSendingError: false,
};

const ActionType = {
  LOAD_MOVIE_CARD: `LOAD_MOVIE_CARD`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  IS_LOADING_DATA: `IS_LOADING_DATA`,
  IS_ERROR_DATA: `IS_ERROR_DATA`

};

const ActionCreator = {
  loadMovieCard: (movieCard) => {
    return {
      type: ActionType.LOAD_MOVIE_CARD,
      payload: movieCard
    };
  },

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadMovieReviews: (movieReviews) => {
    return {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: movieReviews,
    };
  },

  checkIsReviewSending: (isReviewSending) => ({
    type: ActionType.IS_LOADING_DATA,
    payload: isReviewSending,
  }),

  checkIsSendingError: (isSendingError) => ({
    type: ActionType.IS_ERROR_DATA,
    payload: isSendingError,
  }),
};

const Operations = {
  loadMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieCard(adaptMovie(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError());
      });
  },

  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = response.data.map((movie) => adaptMovie(movie));
        dispatch(ActionCreator.loadMovies(movies));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError());
      });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError(true));
      });
  },
  pushReview: (movieId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.checkIsReviewSending(true));
    return api.post(`/comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.checkIsReviewSending(false));
      dispatch(ActionCreator.checkIsSendingError(false));
    })
    .then(() => {
      dispatch(Operations.loadMovieReviews(movieId));
      dispatch(AppStateActionCreator.goToMoviePage());
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsReviewSending(false));
      dispatch(ActionCreator.checkIsSendingError(true));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIE_CARD:
      return extend(state, {
        movieCard: action.payload,
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_MOVIE_REVIEWS:
      return extend(state, {
        movieReviews: action.payload,
      });
    case ActionType.IS_LOADING_DATA:
      return extend(state, {
        isReviewSending: action.payload,
      });
    case ActionType.IS_ERROR_DATA:
      return extend(state, {
        isSendingError: action.payload,
      });
  }

  return state;
};

export {ActionType, ActionCreator, Operations, reducer, initialState};
