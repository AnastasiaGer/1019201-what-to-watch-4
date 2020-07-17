import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import withVideo from "../../hocs/with-video";

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

const MoviesList = (props) => {

  const {movies, onMovieCardClick, handleSmallMovieCardHover} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => {
        return (
          <SmallMovieCardWrapped
            key={movie.id}
            movie={movie}
            onMovieCardClick={onMovieCardClick}
            handleSmallMovieCardHover={handleSmallMovieCardHover}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func,
  handleSmallMovieCardHover: PropTypes.func,
};

export default MoviesList;
