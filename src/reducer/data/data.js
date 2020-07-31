import {extend} from '../../utils/utils';
import {adaptMovie} from '../../adapters/movie';
import {ActionCreator as AppStateActionCreator} from '../app-state/app-state';
import {emptyMovie} from "../../const";

const initialState = {
  movieCard: emptyMovie,
  movies: [],
  movieReviews: [],
  isReviewSending: false,
  favoriteMovies: [],
  isLoading: true,
  isLoadError: false,
  isDataSending: false,
  isSendingSuccessfull: false,
  isSendingError: false,
};

const ActionType = {
  LOAD_MOVIE_CARD: `LOAD_MOVIE_CARD`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  FINISH_LOADING: `FINISH_LOADING`,
  CATCH_LOAD_ERROR: `CATCH_LOAD_ERROR`,
  CHECK_IS_DATA_SENDING: `CHECK_IS_DATA_SENDING`,
  CHECK_IS_SENDING_SUCCESSFULL: `CHECK_IS_REVIEW_SENDING_SUCCESSFULL`,
  CHECK_IS_SENDING_ERROR: `CHECK_IS_REVIEW_SENDING_ERROR`,
  CLEAR_SENDING_ERROR: `CLEAR_SENDING_ERROR`,
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
  finishLoading: () => ({
    type: ActionType.FINISH_LOADING,
    payload: false,
  }),

  catchLoadError: () => ({
    type: ActionType.CATCH_LOAD_ERROR,
    payload: true,
  }),

  checkIsDataSending: (isDataSending) => ({
    type: ActionType.CHECK_IS_DATA_SENDING,
    payload: isDataSending,
  }),

  checkIsSendingSuccessfull: (isSendingSuccessfull) => ({
    type: ActionType.CHECK_IS_SENDING_SUCCESSFULL,
    payload: isSendingSuccessfull,
  }),

  checkIsSendingError: (isSendingError) => ({
    type: ActionType.CHECK_IS_SENDING_ERROR,
    payload: isSendingError,
  }),

  clearSendingError: () => ({
    type: ActionType.CLEAR_SENDING_ERROR,
    payload: false,
  }),
};

const Operations = {
  loadMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieCard(adaptMovie(response.data)));
        dispatch(AppStateActionCreator.setCurrentMovie(adaptMovie(response.data)));

      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = response.data.map((movie) => adaptMovie(movie));
        dispatch(ActionCreator.loadMovies(movies));
        dispatch(ActionCreator.finishLoading());
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },
  pushReview: (movieId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.checkIsReviewSending(true));
    return api.post(`/comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsSendingSuccessfull(true));
      dispatch(ActionCreator.checkIsSendingError(false));

      dispatch(Operations.loadMovieReviews(movieId));
      history.goBack();
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsSendingSuccessfull(false));
      dispatch(ActionCreator.checkIsSendingError(true));
    });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      if (response.data) {
        const favoriteMovies = response.data.map((favoriteMovie) => adaptMovie(favoriteMovie));
        dispatch(ActionCreator.loadFavoriteMovies(favoriteMovies));
      }
    })
    .catch(() => {
      dispatch(ActionCreator.catchLoadError());
    });
  },
  changeIsMovieFavorite: (movieId, isFavorite) => (dispatch, getState, api) => {
    dispatch(ActionCreator.checkIsDataSending(true));
    return api.post(`/favorite/${movieId}/${isFavorite ? 1 : 0}`)
    .then(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsSendingSuccessfull(true));
      dispatch(ActionCreator.checkIsSendingError(false));
      dispatch(Operations.loadMovies());
      dispatch(Operations.loadMovieCard());
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsSendingSuccessfull(false));
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
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });
    case ActionType.FINISH_LOADING:
      return extend(state, {
        isLoading: action.payload,
      });
    case ActionType.CATCH_LOAD_ERROR:
      return extend(state, {
        isLoadError: action.payload,
      });
    case ActionType.CHECK_IS_DATA_SENDING:
      return extend(state, {
        isDataSending: action.payload,
      });
    case ActionType.CHECK_IS_SENDING_SUCCESSFULL:
      return extend(state, {
        isSendingSuccessfull: action.payload,
      });
    case ActionType.CHECK_IS_SENDING_ERROR:
      return extend(state, {
        isSendingError: action.payload,
      });
    case ActionType.CLEAR_SENDING_ERROR:
      return extend(state, {
        isSendingError: action.payload,
      });

  }

  return state;
};

export {ActionType, ActionCreator, Operations, reducer, initialState};
