import {movieCard, movieReviews, movies} from "../mocks/movies.js";
import {DefaultGenre} from "../const.js";
import {extend} from "../utils/utils.js";

const CARDS_BATCH = 8;

const movieTitle = movieCard.title;
const movieGenre = movieCard.genre;
const movieReleaseDate = movieCard.date;

const genres = Array.from(new Set(movies.map((movie) => movie.genre)));
genres.unshift(DefaultGenre);

const initialState = {
  movies,
  movieCard,
  movieTitle,
  movieGenre,
  movieReleaseDate,
  movieReviews,
  activeGenre: DefaultGenre,
  genres,
  activeCard: null,
  cardsToShow: CARDS_BATCH,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
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
    if (genre === DefaultGenre) {
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

    case ActionType.GET_ACTIVE_FILM:
      return extend(state, {
        activeCard: action.payload,
      });
    case ActionType.SHOW_MORE:
      return extend(state, {cardsToShow: state.cardsToShow + action.payload});
  }

  return state;
};

export {reducer, ActionType, ActionCreator, genres, getFilmsByGenre};