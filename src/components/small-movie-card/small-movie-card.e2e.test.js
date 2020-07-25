import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import {movieCard} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`SmallMovieCard e2e tests`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movie: movieCard,
    },
    [NameSpace.APP_STATE]: {
      isVideoPlayer: false,
    },
  });
  it(`SmallMovieCard be clicked`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <Provider store={store}>
          <SmallMovieCard
            movie={movieCard}
            onMovieCardClick={onMovieCardClick}
            isPlaying={false}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </Provider>
    );

    const movieCards = mainComponent.find(`.small-movie-card`);
    const movieTitle = movieCards.find(`.small-movie-card__title`);
    const movieImage = movieCards.find(`.small-movie-card__image`);

    movieTitle.simulate(`click`, {
      preventDefault: onMovieCardClick,
    });

    movieImage.simulate(`click`, {
      preventDefault: onMovieCardClick,
    });

    expect(onMovieCardClick).toHaveBeenCalledTimes(4);
  });
});
