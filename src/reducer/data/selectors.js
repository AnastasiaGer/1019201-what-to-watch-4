import {createSelector} from 'reselect';
import NameSpace from '../name-space';
import {ALL_GENRES, MAX_SHOWN_MOVIES_LIKE_THIS} from "../../const";
import {getActiveGenre, getCurrentMovie} from '../app-state/selectors';

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

export const getFilteredMoviesByGenre = createSelector(
    getMovies,
    getActiveGenre,
    (movies, activeGenre) => {
      if (activeGenre === ALL_GENRES) {
        return movies;
      } else {
        return movies.filter((movie) => movie.genre === activeGenre);
      }
    }
);

export const getFilteredMoviesLikeThis = createSelector(
    getFilteredMoviesByGenre,
    getCurrentMovie,
    (filteredMovies, currentMovie) => {
      return (filteredMovies
          .filter((movie) => movie.id !== currentMovie.id)
          .slice(0, MAX_SHOWN_MOVIES_LIKE_THIS)
      );
    }
);
