import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({activeTab, onTabClick}) => {
  const activeClass = (tab) => activeTab === tab ? `movie-nav__item--active` : ``;

  const handleTabClick = (tab) => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tab);
    };
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={`movie-nav__item ${activeClass(`Overview`)}`}>
          <a onClick={handleTabClick(`Overview`)} href="#" className="movie-nav__link">Overview</a>
        </li>
        <li className={`movie-nav__item ${activeClass(`Details`)}`}>
          <a onClick={handleTabClick(`Details`)} href="#" className="movie-nav__link">Details</a>
        </li>
        <li className={`movie-nav__item ${activeClass(`Reviews`)}`}>
          <a onClick={handleTabClick(`Reviews`)} href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
