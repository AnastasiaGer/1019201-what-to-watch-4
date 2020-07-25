import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from './small-movie-card.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard e2e tests`, () => {
  it(`SmallMovieCard be clicked`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        movieReviews
      },
    });
    const handleMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <Provider store={store}>
          <SmallMovieCard
            movie={movieCard}
            onSmallMovieCardClick={handleMovieCardClick}
            onSmallMovieCardMouseEnter={() => {}}
            onSmallMovieCardMouseOut={() => {}} />
        </Provider>
    );
    const cards = mainComponent.find(`.small-movie-card`);

    cards.forEach((movie) => {
      const title = movie.find(`.small-movie-card__title`);
      title.simulate(`click`, {
        preventDefault: handleMovieCardClick,
      });

      const image = movie.find(`.small-movie-card__image`);
      image.simulate(`click`, {
        preventDefault: handleMovieCardClick,
      });
    });

    expect(handleMovieCardClick).toEqual(handleMovieCardClick);
  });
});
