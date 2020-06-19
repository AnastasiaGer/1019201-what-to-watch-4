import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  title: `The Grand Budapest Hotel`,
  image: `movie-image`,
};

describe(`SmallMovieCard`, () => {
  it(`Should render correctly movie card`, () => {
    const tree = renderer
      .create(<SmallMovieCard
        movie={movie}
        onTitleClick={() => {}}
        onCardHover={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
