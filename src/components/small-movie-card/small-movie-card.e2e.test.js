import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  title: `The Grand Budapest Hotel`,
  image: `movie-image`,
};


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCard e2e tests`, () => {
  it(`SmallMovieCard be hovered`, () => {
    const onCardHover = jest.fn((args) => args);

    const mainComponent = shallow(
        <SmallMovieCard
          movie={movie}
          onTitleClick={() => {}}
          onCardHover={onCardHover} />
    );

    const movieCards = mainComponent.find(`.small-movie-card`);

    movieCards.forEach((movieCard) => {
      movieCard.simulate(`mouseover`, movie);
    });

    expect(onCardHover).toHaveBeenCalledTimes(1);
    expect(onCardHover.mock.calls[0][0]).toMatchObject(movie);
  });
});
