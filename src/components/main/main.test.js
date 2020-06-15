import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  DATE: `2014`,
};

const moviesTitles = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`, `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`, `Midnight Special`];

const cardTitleClickHandler = () => {};

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          movieTitle={Movie.TITLE}
          movieGenre={Movie.GENRE}
          movieDate={Movie.DATE}
          moviesTitles={moviesTitles}
          onCardTitleClick={cardTitleClickHandler}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
