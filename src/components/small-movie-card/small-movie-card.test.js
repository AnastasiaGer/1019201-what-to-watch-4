import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  title: `title-1`,
  image: `image-1`
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
