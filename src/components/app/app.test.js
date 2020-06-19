import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

describe(`App`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<App
        promoMovie={promoMovie}
        movies={movies}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
