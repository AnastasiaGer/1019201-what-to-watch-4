import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const Movie = {
  TITLE: `Film name`,
  GENRE: `Film genre`,
  DATE: 2020,
};

const moviesTitles = [
  `film-1`,
  `film-2`,
  `film-3`,
  `film-4`,
  `film-5`,
  `film-6`,
  `film-7`,
  `film-8`,
  `film-9`,
  `film-10`,
  `film-11`,
  `film-12`,
  `film-13`,
  `film-14`,
  `film-15`,
  `film-16`,
  `film-17`,
  `film-18`,
  `film-19`,
  `film-20`,
];

const onFilmCardTitleClick = jest.fn();

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      film={Movie}
      filmList={moviesTitles}
      onFilmCardTitleClick = {onFilmCardTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
