import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';
import {CustomPropTypes} from '../../utils/props.js';

import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state';
import {Operations as DataOperations} from "../../reducer/data/data";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const SmallMovieCard = (props) => {
  const {movie, onMovieCardClick, isPlaying, setPlayingFilm} = props;
  const {poster, title} = movie;

  const handleMovieCardClick = (evt) => {
    evt.preventDefault();
    onMovieCardClick(movie);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}
    >
      <Link to={AppRoute.MOVIE_PAGE} onClick={handleMovieCardClick}>
        <div className="small-movie-card__image">
          <VideoPlayer
            movie={movie}
            isPlaying={isPlaying}
          />
          <img src={poster} alt={title} width="280" height="175" />
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={AppRoute.MOVIE_PAGE}
          onClick={handleMovieCardClick}
          className="small-movie-card__link">{title}
        </Link>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
  isPlaying: PropTypes.bool,
  setPlayingFilm: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.goToMoviePage());
    dispatch(ActionCreator.changeMovieCard(movie));
    dispatch(ActionCreator.changeFilter(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(null, mapDispatchToProps)(SmallMovieCard);
