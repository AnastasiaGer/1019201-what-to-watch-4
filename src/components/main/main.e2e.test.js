import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const movieCard = {
  title: `No Country for Old Men`,
  genre: `Thriller`,
  date: `2007`,
  background: `https://placeimg.com/1300/512/nature`,
  poster: `img/no-country-for-old-men.jpg`,
  id: 134789,
  description: [`Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.`],
  rating: 8.1,
  ratingDescription: `Good`,
  scores: 870,
  director: `Ethan Coen, Joel Coen`,
  starring: [`Tommy Lee Jones`, `Javier Bardem`, `Josh Brolin`],
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

const movies = [
  {
    title: `Snatch`,
    genre: `Crime`,
    date: `2000`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/snatch.jpg`,
    id: 123890,
    description: [`Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.`],
    rating: 8.2,
    scores: 1500,
    director: `Guy Ritchie`,
    starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    title: `Johnny English`,
    genre: `Comedy`,
    date: `2003`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/johnny-english.jpg`,
    id: 109321,
    description: [`After a cyber-attack reveals the identity of all of the active undercover agents in Britain, Johnny English (Rowan Atkinson) is forced to come out of retirement to find the mastermind hacker.`],
    rating: 6.3,
    scores: 300,
    director: `David Kerr`,
    starring: [`Rowan Atkinson`, `Ben Miller`, `Olga Kurylenko`],
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }];


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main e2e tests`, () => {
  it(`Should be clicked on title`, () => {
    const titleClickHandler = jest.fn();

    const mainComponent = mount(
        <Main
          movieCard={movieCard}
          movies={movies}
          onMovieCardClick={titleClickHandler} />
    );

    const movieTitles = mainComponent.find(`.small-movie-card__title`);

    movieTitles.forEach((movieTitle) => movieTitle.simulate(`click`));

    expect(titleClickHandler.mock.calls.length).toBe((movies.length));
  });

  it(`Should be clicked on image`, () => {
    const titleClickHandler = jest.fn();

    const mainComponent = mount(
        <Main
          movieCard={movieCard}
          movies={movies}
          onMovieCardClick={titleClickHandler} />
    );

    const movieImages = mainComponent.find(`.small-movie-card__image`);

    movieImages.forEach((movieImage) => movieImage.simulate(`click`));

    expect(titleClickHandler.mock.calls.length).toBe((movies.length));
  });
});
