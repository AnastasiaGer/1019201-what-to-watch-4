import * as React from 'react';
import {configure, mount} from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';
import {movieCard} from '../../test-data';

configure({
  adapter: new Adapter(),
});

describe(`VideoPlayer component's tests`, () => {

  it(`VideoPlayer has play state`, () => {
    const isPlaying = false;

    const videoComponent = mount(
        <VideoPlayer
          isPlaying={isPlaying}
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
          isPlaying={isPlaying}
          source={movieCard.preview}
          poster={movieCard.poster}
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

});
