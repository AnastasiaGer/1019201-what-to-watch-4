import * as React from 'react';
import {MovieType} from "../types";
import {Subtract} from "utility-types";

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

      this.setPlayingFilm = this.setPlayingFilm.bind(this);
    }

    private setPlayingFilm(isPlaying) {
      this.setState({
        isPlaying
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        setPlayingFilm={this.setPlayingFilm}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
