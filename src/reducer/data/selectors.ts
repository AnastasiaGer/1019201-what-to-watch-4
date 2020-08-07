import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES} from '../../const';

export const getMovies = (state) => state[NameSpace.DATA].movies;
export const getMovieCard = (state) => state[NameSpace.DATA].movieCard;
export const getMovieReviews = (state) => state[NameSpace.DATA].movieReviews;

export const getFavoriteMovies = (state) => state[NameSpace.DATA].favoriteMovies;
export const getIsLoadError = (state) => state[NameSpace.DATA].isLoadError;
export const getIsReviewSending = (state) => state[NameSpace.DATA].isDataSending;
export const getIsDispatchSuccessful = (state) => state[NameSpace.DATA].isDispatchSuccessful;
export const getIsDispatchError = (state) => state[NameSpace.DATA].isDispatchError;
export const getIsLoading = (state) => state[NameSpace.DATA].isLoading;

export const getMoviesGenres = createSelector(
    getMovies,
    (movies) => {
      const genres = new Set(movies.map((movie) => movie.genre));
      return [ALL_GENRES, ...genres];
    }
);

