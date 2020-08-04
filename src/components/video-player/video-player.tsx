import * as React from 'react';
import {MovieType} from "../../types";

interface Props {
  movie: MovieType;
  isPlaying: boolean,
  src: string;
  poster: string;
}

class VideoPlayer extends React.PureComponent<Props> {
  private _video: React.RefObject<HTMLVideoElement>;
  private _videoPlayerSetTimeout: NodeJS.Timeout;
  constructor(props) {
    super(props);

    this._video = React.createRef();
    this._videoPlayerSetTimeout = null;
  }

  componentDidMount() {
    const {movie} = this.props;
    const {preview, poster} = movie;
    const video = this._video.current;

    video.src = preview;
    video.poster = poster;
    video.muted = true;
  }

  componentWillUnmount() {
    const video = this._video.current;

    video.onplay = null;
    video.src = ``;
    video.poster = ``;
    video.muted = null;
  }

  render() {
    return (
      <video
        className="player__video"
        ref={this._video}
      />
    );
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._video.current;

    if (isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
}

export default VideoPlayer;
