import * as React from 'react';
import {Time} from '../const';
import {Subtract} from 'utility-types';
import {MovieType} from '../types';

interface Props {
  movieCard: MovieType;
}

interface State {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

interface InjectedProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  handleIsPlayingChange: () => void;
  handleSetFullScreen: () => void;
}

const withVideoControls = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;
  class WithVideoControls extends React.PureComponent<T, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this.state = {
        currentTime: 0,
        duration: 0,
        isPlaying: true,
      };

      this._videoRef = React.createRef();

      this._handleIsPlayingChange = this._handleIsPlayingChange.bind(this);
      this._handleSetFullScreen = this._handleSetFullScreen.bind(this);
    }

    componentDidMount() {
      const {movieCard} = this.props;
      const {videoLink} = movieCard;
      const video = this._videoRef.current;

      video.src = videoLink;
      video.play();

      video.onloadedmetadata = () => this.setState({
        duration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentTime: Math.trunc(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.onplay = null;
      video.onpause = null;
      video.src = ``;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    _handleIsPlayingChange() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleSetFullScreen() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    _leftTime() {
      const {currentTime, duration} = this.state;

      const timeDiff = duration - currentTime;

      const seconds = Math.trunc(timeDiff % Time.SECONDS_IN_MINUTE);
      const minutes = Math.trunc(timeDiff / Time.SECONDS_IN_MINUTE);
      const hours = Math.trunc(minutes / Time.MINUTES_IN_HOUR);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    render() {
      const {currentTime, duration, isPlaying} = this.state;
      const {movieCard} = this.props;
      const {poster} = movieCard;
      const leftTime = this._leftTime();

      return <Component
        {...this.props}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        leftTime={leftTime}
        onIsPlayingChange={this._handleIsPlayingChange}
        onSetFullScreen={this._handleSetFullScreen}
      >
        <video className="player__video"
          poster={poster}
          ref={this._videoRef}
        >your browser doesn`t support embedded videos</video>
      </Component>;
    }
  }

  return WithVideoControls;
};

export default withVideoControls;
