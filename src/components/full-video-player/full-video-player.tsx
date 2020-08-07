import * as React from 'react';
import history from "../../history";
import {MovieType} from '../../types';

interface Props {
  children: React.ReactNode;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  leftTime: string;
  onIsPlayingChange: () => void;
  onSetFullScreen: () => void;
  movieCard: MovieType;
}


const FullVideoPlayer: React.FC<Props> = (props: Props) => {
  const {movieCard, children, duration, currentTime, isPlaying, leftTime, onIsPlayingChange, onSetFullScreen} = props;
  const {title} = movieCard;

  return (
    <div className="player">
      {children}

      <button onClick={() => history.goBack()} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={duration}></progress>
            <div className="player__toggler" style={{left: ((currentTime * 100) / duration) + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{leftTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={() => onIsPlayingChange()}
          >
            {isPlaying ?
              <React.Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </React.Fragment> :
              <React.Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </React.Fragment>}
          </button>
          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen"
            onClick={() => onSetFullScreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullVideoPlayer;
