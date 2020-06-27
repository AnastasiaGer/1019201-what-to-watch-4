import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from './video-player.jsx';

const movie = {
  title: `No Country for Old Men`,
  genre: `Thriller`,
  date: `2007`,
  background: `https://placeimg.com/1300/512/nature`,
  poster: `img/no-country-for-old-men.jpg`,
  id: 134789,
  description: [`Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.`],
  rating: 8.1,
  scores: 870,
  director: `Ethan Coen, Joel Coen`,
  starring: [`Tommy Lee Jones`, `Javier Bardem`, `Josh Brolin`],
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

describe(`VideoPlayer`, () => {
  it(`Should render correctly component`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            movie={movie}
            onplaying = {true}
            muted = {true}
          />, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

