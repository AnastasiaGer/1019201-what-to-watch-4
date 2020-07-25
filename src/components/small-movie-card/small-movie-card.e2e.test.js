import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import {movies} from '../../utils/test-data.js';

const movie = movies[0];


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard e2e tests`, () => {
  it(`SmallMovieCard be clicked`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <SmallMovieCard
          movie={movie}
          onMovieCardClick={onMovieCardClick}
          isPlaying={true}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
    );

    const movieCards = mainComponent.find(`.small-movie-card`);

    movieCards.forEach((movieCard) => {
      const movieTitle = movieCard.find(`.small-movie-card__title`);
      movieTitle.simulate(`click`, {
        preventDefault: onMovieCardClick,
      });

      const movieImage = movieCard.find(`.small-movie-card__image`);
      movieImage.simulate(`click`, {
        preventDefault: onMovieCardClick,
      });
    });

    expect(onMovieCardClick).toHaveBeenCalledTimes(4);
  });
});
