import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {promoMovie, movies} = props;

  const handleTitleClick = (evt) => {
    evt.preventDefault();
  };

  return (
    <Main
      promoMovie={promoMovie}
      movies={movies}
      onTitleClick={handleTitleClick} />
  );
};

App.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
