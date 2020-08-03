import NameSpace from '../name-space';
import {getMovies} from '../data/selectors';

export const getCurrentMovie = (state) => state[NameSpace.APP_STATE].currentMovie;

export const getCurrentMovieById = (state, ownProps) => {
  const movies = getMovies(state);
  const movieId = parseInt(ownProps.routeProps.match.params.id, 10);
  const [currentMovie] = movies.find((movie) => movie.id === movieId);

  return currentMovie;
};

export const getIsMoviePlayerActive = (state) => state[NameSpace.APP_STATE].isVideoPlayer;

export const getActiveGenre = (state) => state[NameSpace.APP_STATE].activeGenre;
