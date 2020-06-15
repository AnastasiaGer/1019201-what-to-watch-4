import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const Movie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  DATE: `2014`,
};

const moviesTitles = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`, `What We Do in the Shadows`, `Revenant`, `Johnny English`, `Shutter Island`, `Pulp Fiction`, `No Country for Old Men`, `Snatch`, `Moonrise Kingdom`, `Seven Years in Tibet`, `Midnight Special`, `War of the Worlds`, `Dardjeeling Limited`, `Orlando`, `Mindhunter`, `Midnight Special`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Card title should be pressed`, () => {
  const cardTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        movieTitle={Movie.TITLE}
        movieGenre={Movie.GENRE}
        movieDate={Movie.DATE}
        moviesTitles={moviesTitles}
        onCardTitleClick={cardTitleClickHandler}
      />
  );

  const movieCardTitles = main.find(`.small-movie-card__title`);

  movieCardTitles.forEach((movieCardTitle) => {
    movieCardTitle.props().onClick();
  });

  expect(cardTitleClickHandler.mock.calls.length).toBe(movieCardTitles.length);
});
