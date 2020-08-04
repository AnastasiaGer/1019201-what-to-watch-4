import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayer from './video-player';

const mock = {
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

describe(`VideoPlayer`, () => {
  it(`Should render correctly component`, () => {
    const {src, image} = mock;
    const tree = renderer
      .create(
          <VideoPlayer
            isPlaying = {true}
            source={src}
            poster={image}
          />, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

