import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {movies} from '../../utils/test-data.js';
import FullVideoPlayer from './full-video-player.jsx';

const movie = movies[0];
const mockStore = configureStore([]);

describe(`FullVideoPlayer`, () => {
  const store = mockStore({
    [NameSpace.APP_STATE]: {
      currentPage: `main`,
    },
  });

  it(`Render FullVideoPlayer`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <FullVideoPlayer
              currentTime={20}
              duration={100}
              movieCard={movie}
              isPlaying={true}
              leftTime={`00:10:12`}
              onClosePlayerClick={() => {}}
              onIsPlayingChange={() => {}}
              onSetFullScreen={() => {}}
            ><video/>
            </FullVideoPlayer>
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
