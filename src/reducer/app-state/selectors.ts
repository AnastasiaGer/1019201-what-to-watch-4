import NameSpace from '../name-space';
import {getMovies} from '../data/selectors';
import {ALL_GENRES, MAX_SHOWN_MOVIES_LIKE_THIS} from "../../const";
import {createSelector} from 'reselect';

export const getCurrentMovie = (state) => state[NameSpace.APP_STATE].currentMovie;

export const getCurrentMovieById = (state, ownProps) => {
  const movies = getMovies(state);
  const movieId = parseInt(ownProps.routeProps.match.params.id, 10);
  const [currentMovie] = movies.filter((movie) => movie.id === movieId);

  return currentMovie;
};

export const getIsMoviePlayerActive = (state) => state[NameSpace.APP_STATE].isVideoPlayer;

export const getActiveGenre = (state) => state[NameSpace.APP_STATE].activeGenre;

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
