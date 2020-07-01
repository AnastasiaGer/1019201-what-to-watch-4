import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {movies} from '../../utils/test-data.js';

describe(`MoviesList`, () => {
  it(`Should render correctly movie card`, () => {
    const tree = renderer
      .create(<MoviesList
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
