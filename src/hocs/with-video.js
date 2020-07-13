import React, {PureComponent} from 'react';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._setPlayingFilm = this._setPlayingFilm.bind(this);
      this._handleSmallMovieCardHover = this._handleSmallMovieCardHover.bind(this);
    }

    _setPlayingFilm(isPlaying) {
      this.setState({
        isPlaying
      });
    }

    _handleSmallMovieCardHover(movie) {
      this.setState({
        activeCard: movie,
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        setPlayingFilm={this._setPlayingFilm}
        handleSmallMovieCardHover={this._handleSmallMovieCardHover}
      />;
    }
  }

  WithVideo.propTypes = {};

  return WithVideo;
};

export default withVideo;
