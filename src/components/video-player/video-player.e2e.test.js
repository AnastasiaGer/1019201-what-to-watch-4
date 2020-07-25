import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from './video-player.jsx';
import {movieCard} from '../../utils/test-data.js';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`VideoPlayer component's tests`, () => {

  it(`VideoPlayer has play state`, () => {
    const isPlaying = false;

    const videoComponent = mount(
        <VideoPlayer
          movie={movieCard}
          isPlaying={isPlaying}
          muted
          source={movieCard.preview}
          poster={movieCard.poster}
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

  it(`VideoPlayer has pause state`, () => {
    const isPlaying = true;

    const videoComponent = mount(
        <VideoPlayer
          movie={movieCard}
          isPlaying={isPlaying}
          muted
          source={movieCard.preview}
          poster={movieCard.poster}
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

});
