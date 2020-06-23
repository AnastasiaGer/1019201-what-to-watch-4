import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const movieCard = {
  title: `Aviator`,
  genre: `Drama`,
  date: `2004`,
  background: `https://placeimg.com/1300/512/nature`,
  poster: `img/aviator.jpg`,
  id: 167456,
  description: [`A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.`],
  rating: `7,5`,
  scores: 1650,
  director: `Martin Scorsese`,
  starring: [`Leonardo DiCaprio`, `Cate Blanchett`, `Kate Beckinsale`]
};

const movies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    date: `2018`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    id: 189234,
    description: [`The second installment of the "Fantastic Beasts" series featuring the adventures of Magizoologist Newt Scamander.`],
    rating: `6,6`,
    scores: 500,
    director: `David Yates`,
    starring: [`Johnny Depp`, `Eddie Redmayne`, `Katherine Waterston`, `Dan Fogler`]
  },
  {
    title: `Bohemian Rhapsody`,
    genre: `Documentary`,
    date: `2018`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/bohemian-rhapsody.jpg`,
    id: 178345,
    description: [`The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).`],
    rating: `8,0`,
    scores: 800,
    director: `Bryan Singer`,
    starring: [`Rami Malek`, `Lucy Boynton`, `Gwilym Lee`]
  }];

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const tree = renderer
      .create(<Main
        movieCard={movieCard}
        movies={movies}
        onMovieCardClick={() => {}} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
