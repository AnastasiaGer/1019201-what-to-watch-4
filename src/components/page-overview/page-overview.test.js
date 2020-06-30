import React from 'react';
import renderer from 'react-test-renderer';

import PageOverview from './page-overview.jsx';

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

it(`Should PageOverview render correctly`, () => {
  const {description, director, rating, scores, starring} = movie;

  const tree = renderer
    .create(<PageOverview
      description={description}
      director={director}
      rating={rating}
      scores={scores}
      starring={starring}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
