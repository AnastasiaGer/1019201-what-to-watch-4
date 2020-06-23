import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const promoMovie = {
  title: `The Dark Knight`,
  genre: `Action`,
  date: `2008`,
};

const movies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/bohemian-rhapsody.jpg`
  },
  {
    title: `Macbeth`,
    image: `img/macbeth.jpg`
  },
  {
    title: `Aviator`,
    image: `img/aviator.jpg`
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
