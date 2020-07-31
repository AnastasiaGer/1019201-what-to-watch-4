import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import withVideo from "../../hocs/with-video";

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

const MoviesList = (props) => {

  const {movies, handleSmallMovieCardHover, render} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          return (
            <SmallMovieCardWrapped
              key={movie.id}
              movie={movie}
              handleSmallMovieCardHover={handleSmallMovieCardHover}
            />
          );
        })}
      </div>
      {render()}
    </React.Fragment>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  handleSmallMovieCardHover: PropTypes.func,
  render: PropTypes.func
};

export default MoviesList;
