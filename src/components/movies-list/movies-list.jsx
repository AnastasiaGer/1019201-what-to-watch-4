import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const MoviesList = ({movies, onTitleClick}) => {
  const handleCardHover = () => {};

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, index) => {
        return (
          <SmallMovieCard
            key={movie.title + index}
            movie={movie}
            onTitleClick={onTitleClick}
            onCardHover={handleCardHover}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
