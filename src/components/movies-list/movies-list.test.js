import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

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

describe(`MoviesList`, () => {
  it(`Should render correctly movie card`, () => {
    const tree = renderer
      .create(<MoviesList
        movies={movies}
        onTitleClick={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
