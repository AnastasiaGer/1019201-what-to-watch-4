import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import PageHeader from '../page-header/page-header.jsx';
import MyListButton from '../my-list-button/my-list-button.jsx';

import {CustomPropTypes} from '../../utils/props.js';
import {AuthorizationStatus, AppRoute, PageNames} from "../../const.js";

import {getAuthorizationStatus} from '../../reducer/user/selectors';
const MovieCardHero = ({currentMovie, isSignedIn}) => {
  const addReviewButton = (
    <Link
      to={`${AppRoute.MOVIE_PAGE}/${currentMovie.id}/review`}
      className="btn movie-card__button"
    >Add review
    </Link>
  );

  return (
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={currentMovie.background} alt={currentMovie.title} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader
        currentPage={PageNames.MOVIE_DETAILS}
      />
      <div className="movie-card__wrap">
        <div className="movie-card__desc">
          <h2 className="movie-card__title">{currentMovie.title}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{currentMovie.genre}</span>
            <span className="movie-card__year">{currentMovie.date}</span>
          </p>
          <div className="movie-card__buttons">
            <Link
              className="btn btn--play movie-card__button"
              to={`${AppRoute.VIDEO_PLAYER}/${currentMovie.id}`}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </Link>
            <MyListButton
              movie={currentMovie}
            />
            {isSignedIn && addReviewButton}
          </div>
        </div>
      </div>
    </div>
  );
};

MovieCardHero.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  isSignedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
});

export default connect(mapStateToProps)(MovieCardHero);
