import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';

describe(`App`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<App
        movieCard={movieCard}
        movies={movies}
        movieReviews={movieReviews}
      />, {
        createNodeMock: () => {
          return {};
        },
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
