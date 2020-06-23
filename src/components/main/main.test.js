import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const movieCard = {
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

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<Main
        movieCard={movieCard}
        movies={movies}
        onTitleClick={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
