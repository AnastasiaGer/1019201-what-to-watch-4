import React from 'react';
import renderer from 'react-test-renderer';

import PageDetails from './page-details.jsx';

const movie = {
  title: `Snatch`,
  genre: `Crime`,
  date: `2000`,
  background: `https://placeimg.com/1300/512/nature`,
  poster: `img/snatch.jpg`,
  id: 123890,
  description: [`Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.`],
  rating: 8.1,
  scores: 1500,
  director: `Guy Ritchie`,
  starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  movieDurationTime: `1h 49m`,
};

it(`Should PageDetails render correctly`, () => {
  const {director, genre, movieDurationTime, starring, date} = movie;

  const tree = renderer
    .create(<PageDetails
      director={director}
      genre={genre}
      movieDurationTime={movieDurationTime}
      starring={starring}
      date={date}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
