import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {genres, onGenreItemClick, activeGenre} = props;

  const activeClass = (genre) => {
    return activeGenre === genre ? `catalog__genres-item--active` : ``;
  };

  const handleGenreClick = (genre) => {
    return (evt) => {
      evt.preventDefault();
      onGenreItemClick(genre);
    };
  };

  const getGenre = (genre, i) => {
    const genreClass = `catalog__genres-item ${activeClass(genre)}`;
    const key = `${genre} + ${i}`;

    return (
      <li
        className={genreClass}
        key={key}
      >
        <a onClick={handleGenreClick(genre)} href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  };

  const renderGenres = () => genres.map(getGenre);

  return (
    <ul className="catalog__genres-list">
      {renderGenres()}
    </ul>
  );
};


GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

export default GenresList;
