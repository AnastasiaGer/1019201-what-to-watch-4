import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {movies} from '../../test-data';
import {noop} from "../../utils";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from '../../history';
import FullVideoPlayer from './full-video-player';

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
              onIsPlayingChange={noop}
              onSetFullScreen={noop}
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
