import {movieCard, movieReviews, movies} from "../mocks/movies.js";
import {DEFAULT_GENRE} from "../const.js";
import {extend} from "../utils/utils.js";

const CARDS_BATCH = 8;

const movieTitle = movieCard.title;
const movieGenre = movieCard.genre;
const movieReleaseDate = movieCard.date;

const genres = Array.from(new Set(movies.map((movie) => movie.genre)));
genres.unshift(DEFAULT_GENRE);

const initialState = {
  movies,
  movieCard,
  movieTitle,
  movieGenre,
  movieReleaseDate,
  movieReviews,
  activeGenre: DEFAULT_GENRE,
  genres,
  currentMovieCard: null,
  cardsToShow: CARDS_BATCH,
  isVideoPlayer: false
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
  CHANGE_MOVIE_CARD: `CHANGE_MOVIE_CARD`,
  PLAY_MOVIE: `PLAY_MOVIE`,
  STOP_MOVIE: `STOP_MOVIE`
};

const getFilmsByGenre = (films, genre) => {
  return films.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  showMore: () => ({
    type: ActionType.SHOW_MORE,
    payload: CARDS_BATCH,
  }),

  getFilmsByGenre: (genre) => {
    if (genre === DEFAULT_GENRE) {
      return {
        type: ActionType.GET_FILMS_BY_GENRE,
        payload: initialState.movies,
      };
    }

    const filteredFilms = getFilmsByGenre(initialState.movies, genre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filteredFilms,
    };
  },
  changeMovieCard: (movie) => ({
    type: ActionType.CHANGE_MOVIE_CARD,
    payload: movie,
  }),
  playFullMovie: (isVideoPlayer) => ({
    type: ActionType.PLAY_MOVIE,
    payload: isVideoPlayer,
  }),
  closeFulMovie: (isVideoPlayer) => ({
    type: ActionType.STOP_MOVIE,
    payload: isVideoPlayer,
  }),
};

const reducer = (state = extend(initialState), action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return extend(state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        movies: action.payload,
      });
    case (ActionType.CHANGE_MOVIE_CARD):
      return extend(state, {
        currentMovieCard: action.payload,
      });
    case ActionType.GET_ACTIVE_FILM:
      return extend(state, {
        activeCard: action.payload,
      });
    case (ActionType.PLAY_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case (ActionType.STOP_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case ActionType.SHOW_MORE:
      return extend(state, {cardsToShow: state.cardsToShow + action.payload});
  }

  return state;
};

export {reducer, ActionType, ActionCreator, genres, getFilmsByGenre};
