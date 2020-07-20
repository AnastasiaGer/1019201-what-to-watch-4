import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {movieCard} from '../../utils/test-data.js';
import FullVideoPlayer from './full-video-player.jsx';

const mockStore = configureStore([]);

describe(`FullVideoPlayer`, () => {
  const store = mockStore({
    currentPage: `/`,
  });

  it(`Render FullVideoPlayer`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FullVideoPlayer
            currentTime={20}
            duration={100}
            movieCard={movieCard}
            isPlaying={true}
            leftTime={`00:10:12`}
            onClosePlayerClick={() => {}}
            onIsPlayingChange={() => {}}
            onSetFullScreen={() => {}}
          ><video/>
          </FullVideoPlayer>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
