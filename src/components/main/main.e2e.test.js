import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const Movie = {
  TITLE: `Film name`,
  GENRE: `Film genre`,
  DATE: 2020
};

const moviesTitles = [
  `film-1`
];

it(`Should film-card title be pressed`, () => {

  const onFilmCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        film={Movie}
        filmList={moviesTitles}
        onFilmCardTitleClick={onFilmCardTitleClick}
      />);

  const filmCardLink = main.find(`.small-movie-card__title`).first();

  filmCardLink.forEach((title) => title.simulate(`click`));

  expect(onFilmCardTitleClick.mock.calls.length).toBe(Movie.length);

});
