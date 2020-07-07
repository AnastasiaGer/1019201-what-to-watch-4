import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';

const mockStore = configureStore([]);

const activeGenre = `Drama`;
const genres = [`All genres`, `Drama`, `Documentary`, `Horror`];

const createNodeMock = () => {
  return {};
};

describe(`App`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const store = mockStore({
      mistakes: 0,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              movieCard={movieCard}
              movies={movies}
              movieReviews={movieReviews}
              genres={genres}
              activeGenre={activeGenre}
              onGenreItemClick={() => {}}
              onShowMoreClick={() => {}}
              shown={0}
            />
          </Provider>, {createNodeMock})
     .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
