import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {movieCard, movies} from '../../utils/test-data.js';

const genres = [`Comedies`, `Crime`, `Documentary`];
const activeGenre = `Comedies`;

const createNodeMock = () => {
  return {};
};

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<Main
        movieCard={movieCard}
        movies={movies}
        onMovieCardClick={() => {}}
        genres={genres}
        activeGenre={activeGenre}
        onGenreItemClick={() => {}}
        shown={0}
        onShowMoreClick={() => {}}
        onPlayClick={() => {}}
      />, {createNodeMock})
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
