import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import NameSpace from '../../reducer/name-space';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {movieCard} from '../../utils/test-data.js';

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard e2e tests`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movieCard,
    },
  });

  it(`SmallMovieCard be clicked`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <Provider store={store}>
          <SmallMovieCard
            movie={movieCard}
            onMovieCardClick={onMovieCardClick}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </Provider>);

    const movieCardSmall = mainComponent.find(`.small-movie-card`);
    const movieTitle = movieCardSmall.find(`.small-movie-card__title`);

    movieTitle.simulate(`click`, {
      preventDefault: onMovieCardClick,
    });

    expect(onMovieCardClick).toHaveBeenCalledTimes(4);
  });
});
