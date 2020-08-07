import {extend} from '../../utils';
import {adaptMovie} from '../../adapters/movie';
import {ActionCreator as AppStateActionCreator} from '../app-state/app-state';
import {MovieType, ReviewType} from '../../types';
import history from '../../history';

interface DataActionInterface {
  type?: string;
  payload?: MovieType | Array<MovieType> | Array<ReviewType> | boolean;
}

interface InitialStateInterface {
  movieCard?: MovieType | {};
  movies?: Array<MovieType> | [];
  movieReviews?: Array<ReviewType> | [];
  favoriteMovies?: Array<MovieType> | [];
  isLoading?: boolean;
  isLoadError?: boolean;
  isDataSending?: boolean;
  isDispatchSuccessful?: boolean;
  isDispatchError?: boolean;
}

const initialState: InitialStateInterface = {
  movieCard: {},
  movies: [],
  movieReviews: [],
  favoriteMovies: [],
  isLoading: true,
  isLoadError: false,
  isDataSending: false,
  isDispatchSuccessful: false,
  isDispatchError: false,
};

const ActionType = {
  LOAD_MOVIE_CARD: `LOAD_MOVIE_CARD`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  FINISH_LOADING: `FINISH_LOADING`,
  CATCH_LOAD_ERROR: `CATCH_LOAD_ERROR`,
  CHECK_IS_DATA_SENDING: `CHECK_IS_DATA_SENDING`,
  CHECK_IS_DISPATCH_SUCCESSFUL: `CHECK_IS_DISPATCH_SUCCESSFUL`,
  CHECK_IS_DISPATCH_ERROR: `CHECK_IS_DISPATCH_ERROR`,
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
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies,
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

  checkIsDispatchSuccessful: (isDispatchSuccessful) => ({
    type: ActionType.CHECK_IS_DISPATCH_SUCCESSFUL,
    payload: isDispatchSuccessful,
  }),

  checkIsDispatchError: (isDispatchError) => ({
    type: ActionType.CHECK_IS_DISPATCH_ERROR,
    payload: isDispatchError,
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
    dispatch(ActionCreator.checkIsDataSending(true));
    return api.post(`/comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsDispatchSuccessful(true));
      dispatch(ActionCreator.checkIsDispatchError(false));

      dispatch(Operations.loadMovieReviews(movieId));
      history.goBack();
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsDispatchSuccessful(false));
      dispatch(ActionCreator.checkIsDispatchError(true));
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
      dispatch(ActionCreator.checkIsDispatchSuccessful(true));
      dispatch(ActionCreator.checkIsDispatchError(false));
      dispatch(Operations.loadMovies());
      dispatch(Operations.loadMovieCard());
    })
    .catch(() => {
      dispatch(ActionCreator.checkIsDataSending(false));
      dispatch(ActionCreator.checkIsDispatchSuccessful(false));
      dispatch(ActionCreator.checkIsDispatchError(true));
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
    case ActionType.CHECK_IS_DISPATCH_SUCCESSFUL:
      return extend(state, {
        isDispatchSuccessful: action.payload,
      });
    case ActionType.CHECK_IS_DISPATCH_ERROR:
      return extend(state, {
        isDispatchError: action.payload,
      });
    case ActionType.CLEAR_SENDING_ERROR:
      return extend(state, {
        isDispatchError: action.payload,
      });

  }

  return state;
};

export {ActionType, ActionCreator, Operations, reducer, initialState};
