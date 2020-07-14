import {reducer, ActionCreator, ActionType, genres, getFilmsByGenre} from "./reducer.js";
import {movies, movieCard, movieReviews} from "../mocks/movies.js";
import {DEFAULT_GENRE} from "../const.js";

const movieTitle = movieCard.title;
const movieGenre = movieCard.genre;
const movieReleaseDate = movieCard.date;


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: DEFAULT_GENRE,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  });
});

it(`Reducer should change genre filter`, () => {
  expect(reducer({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Documentary`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Dramas`,
  })).toEqual({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  });

  expect(reducer({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Kids & Family`,
  })).toEqual({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Kids & Family`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  });
});

it(`Reducer should return filtered films`, () => {
  expect(reducer({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: DEFAULT_GENRE,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: getFilmsByGenre(movies, `Romance`),
  })).toEqual({
    movies: getFilmsByGenre(movies, `Romance`),
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: DEFAULT_GENRE,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  });

  expect(reducer({
    movies: getFilmsByGenre(movies, `Romance`),
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: movies,
  })).toEqual({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres,
    cardsToShow: 8,
    currentMovieCard: null,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changeFilter`, () => {
    expect(ActionCreator.changeFilter(`Documentary`)).toEqual({
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Documentary`,
    });
  });

  it(`Action creator for getFilmsByGenre returns films filtered by default genre`, () => {
    expect(ActionCreator.getFilmsByGenre(DEFAULT_GENRE)).toEqual({
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: movies,
    });
  });

  it(`ActionCreator for incrementing number of cards to show returns correct action`, () => {
    expect(ActionCreator.showMore(8)).toEqual({
      type: ActionType.SHOW_MORE,
      payload: 8,
    });
  });
});
