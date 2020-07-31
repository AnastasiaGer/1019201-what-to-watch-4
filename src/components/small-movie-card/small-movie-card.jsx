import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const SmallMovieCard = (props) => {
  const {movie, isPlaying, setPlayingFilm} = props;
  const {poster, title, id} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}
    >
      <Link
        className="small-movie-card__link"
        to={`${AppRoute.MOVIE_PAGE}/${id}`}>
        <div
          className="small-movie-card__image">
          <VideoPlayer
            movie={movie}
            isPlaying={isPlaying}
          />
          <img src={poster} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">{title}</h3>
      </Link>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  onMovieCardHover: PropTypes.func,
  isPlaying: PropTypes.bool,
  setPlayingFilm: PropTypes.func,
};

export default SmallMovieCard;

