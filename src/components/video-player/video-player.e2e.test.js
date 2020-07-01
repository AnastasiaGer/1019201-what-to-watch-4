import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  movieDurationTime: `1h 49m`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`VideoPlayer component's tests`, () => {

  it(`VideoPlayer has play state`, () => {
    const isPlaying = false;

    const videoComponent = mount(
        <VideoPlayer
          movie={movie}
          isPlaying={isPlaying}
          muted
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

  it(`VideoPlayer has pause state`, () => {
    const isPlaying = true;

    const videoComponent = mount(
        <VideoPlayer
          movie={movie}
          isPlaying={isPlaying}
          muted
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

});