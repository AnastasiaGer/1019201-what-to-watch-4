import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";
import {movieCard} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe(`SmallMovieCard`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: movieCard,
    },
    [NameSpace.APP_STATE]: {
      isVideoPlayer: false,
    },
  });
  it(`Should render correctly movie card`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <SmallMovieCard
              movie={movieCard}
              onMovieCardClick={() => {}}
              onMovieCardHover={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
