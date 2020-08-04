import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import SmallMovieCard from './small-movie-card';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import {movieCard, movies, reviews} from '../../test-data';

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard e2e tests`, () => {
  it(`SmallMovieCard be hovered`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        movieReviews: reviews
      },
    });
    const setPlayingFilm = jest.fn();

    const mainComponent = shallow(
        <Provider store={store}>
          <SmallMovieCard
            movie={movieCard}
            isPlaying={false}
            setPlayingFilm={setPlayingFilm}
            />
        </Provider>
    );
    const card = mainComponent.find(`.small-movie-card`);

    card.simulate(`mouseenter`, movieCard);
    expect(setPlayingFilm).toEqual(setPlayingFilm);
    card.simulate(`mouseout`, movieCard);
    expect(setPlayingFilm).toEqual(setPlayingFilm);
  });
});
