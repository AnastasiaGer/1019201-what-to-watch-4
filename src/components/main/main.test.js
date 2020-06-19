import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const promoMovie = {
  TITLE: `The Dark Knight`,
  GENRE: `Action`,
  DATE: `2008`,
};

const movies = [
  {
    title: `title-1`,
    image: `image-1`
  },
  {
    title: `title-2`,
    image: `image-2`
  },
  {
    title: `title-3`,
    image: `image-3`
  },
  {
    title: `title-4`,
    image: `image-4`
  }
];

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<Main
        promoMovie={promoMovie}
        movies={movies}
        onTitleClick={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
