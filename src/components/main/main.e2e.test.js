import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {movieCard, movies} from '../../utils/test-data.js';


Enzyme.configure({
  adapter: new Adapter(),
});

const genres = [`Comedies`, `Crime`, `Documentary`];
const activeGenre = `Comedies`;

describe(`Main e2e tests`, () => {
  it(`Should be clicked on title`, () => {
    const titleClickHandler = jest.fn();

    const mainComponent = mount(
        <Main
          movieCard={movieCard}
          movies={movies}
          onMovieCardClick={titleClickHandler}
          genres={genres}
          activeGenre={activeGenre}
          onGenreItemClick={() => {}}
        />
    );

    const movieTitles = mainComponent.find(`.small-movie-card__title`);

    movieTitles.forEach((movieTitle) => movieTitle.simulate(`click`));

    expect(titleClickHandler.mock.calls.length).toBe((movies.length));
  });

  it(`Should be clicked on image`, () => {
    const titleClickHandler = jest.fn();

    const mainComponent = mount(
        <Main
          movieCard={movieCard}
          movies={movies}
          onMovieCardClick={titleClickHandler}
          genres={genres}
          activeGenre={activeGenre}
          onGenreItemClick={() => {}}
        />
    );

    const movieImages = mainComponent.find(`.small-movie-card__image`);

    movieImages.forEach((movieImage) => movieImage.simulate(`click`));

    expect(titleClickHandler.mock.calls.length).toBe((movies.length));
  });
});
