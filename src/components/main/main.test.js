import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {movieCard, movies} from '../../utils/test-data.js';

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<Main
        movieCard={movieCard}
        movies={movies}
        onMovieCardClick={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
