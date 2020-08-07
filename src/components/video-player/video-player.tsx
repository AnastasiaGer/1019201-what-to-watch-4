import * as React from 'react';
interface Props {
  isPlaying: boolean;
  source: string;
  poster: string;
}

class VideoPlayer extends React.PureComponent<Props> {
  private _video: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this._video = React.createRef();
  }

  componentDidMount() {
    const video = this._video.current;

    video.muted = true;

  }

  componentWillUnmount() {
    const video = this._video.current;
    video.onplay = null;
    video.src = ``;

    video.muted = null;
  }

  componentDidUpdate() {
    const {source, isPlaying} = this.props;
    const video = this._video.current;

    video.src = source;

    if (isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    const {poster} = this.props;
    return (
      <video
        className="player__video"
        ref={this._video}
        poster={poster}
      />
    );
  }
}

export default VideoPlayer;
