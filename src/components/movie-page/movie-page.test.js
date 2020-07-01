import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';


describe(`MoviePage`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<MoviePage
        movieCard={movieCard}
        movies={movies}
        movieReviews={movieReviews}
        renderTabs={() => {}}
        activeTab={``}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
