import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from './video-player.jsx';
import {movieCard} from '../../utils/test-data.js';

describe(`VideoPlayer`, () => {
  it(`Should render correctly component`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            movie={movieCard}
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

