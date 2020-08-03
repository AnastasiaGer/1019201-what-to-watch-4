import * as React from 'react';
import {Subtract} from "utility-types";
import {MovieType} from '../types'

interface Props {
  movie: MovieType;
}

interface State {
  isPlaying: boolean;
}

interface InjectedProps {
  isPlaying: boolean;
  setPlayingFilm: (isPlaying: boolean) => void;
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;
  class WithVideo extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._setPlayingFilm = this._setPlayingFilm.bind(this);
      // this._handleSmallMovieCardHover = this._handleSmallMovieCardHover.bind(this);
    }

    _setPlayingFilm(isPlaying) {
      this.setState({
        isPlaying
      });
    }

    // _handleSmallMovieCardHover(movie) {
    //   this.setState({
    //     activeCard: movie,
    //   });
    // }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        setPlayingFilm={this._setPlayingFilm}
        // handleSmallMovieCardHover={this._handleSmallMovieCardHover}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
