import {reducer, ActionCreator, ActionType, genres, getFilmsByGenre} from "./reducer.js";
import {movies, movieCard, movieReviews} from "../mocks/movies.js";
import {DefaultGenre} from "../const.js";

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
    activeGenre: DefaultGenre,
    genres
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
    genres
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
    genres
  });

  expect(reducer({
    movies,
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres
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
    genres
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
    activeGenre: DefaultGenre,
    genres
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
    activeGenre: DefaultGenre,
    genres
  });

  expect(reducer({
    movies: getFilmsByGenre(movies, `Romance`),
    movieCard,
    movieTitle,
    movieGenre,
    movieReleaseDate,
    movieReviews,
    activeGenre: `Dramas`,
    genres
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
    genres
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
    expect(ActionCreator.getFilmsByGenre(DefaultGenre)).toEqual({
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: movies,
    });
  });
});