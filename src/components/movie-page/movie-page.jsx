import React from "react";
import PropTypes from "prop-types";

import PageOverview from '../page-overview/page-overview.jsx';
import PageDetails from '../page-details/page-details.jsx';
import PageReviews from '../page-reviews/page-reviews.jsx';

import MoviesList from '../movies-list/movies-list.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import {connect} from 'react-redux';
import {getCurrentMovie} from '../../reducer/app-state/selectors.js';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {AuthorizationStatus} from '../../const';
import PageFooter from '../page-footer/page-footer.jsx';
import PageHeader from '../page-header/page-header.jsx';

import withShowMore from '../../hocs/with-show-more';

const MoviesListWrapped = withShowMore(MoviesList);

const MoviePage = ({currentMovie, movieReviews,
  renderTabs,
  activeTab, onPlayClick, onAddReviewClick, isSignedIn}) => {

  const {
    title,
    genre,
    date,
    poster,
    background,
    rating,
    description,
    starring,
    director,
    scores,
    movieDurationTime
  } = currentMovie;

  const addReviewButton = (
    <a
      href="add-review.html"
      className="btn movie-card__button"
      onClick={(evt) => {
        evt.preventDefault();
        onAddReviewClick();
      }}>Add review</a>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case `Overview`:
        return <PageOverview
          rating={rating}
          scores={scores}
          description={description}
          director={director}
          starring={starring}
        />;
      case `Details`:
        return <PageDetails
          director={director}
          genre={genre}
          movieDurationTime={movieDurationTime}
          starring={starring}
          date={date}
        />;
      case `Reviews`:
        return <PageReviews
          movieReviews={movieReviews}
        />;
      default:
        return ``;
    }
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <PageHeader />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{date}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayClick(currentMovie)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                {isSignedIn && addReviewButton}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              {renderTabs()}
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <MoviesListWrapped
            />
          </div>
        </section>

        <PageFooter />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func,
  onAddReviewClick: PropTypes.func,
  isSignedIn: PropTypes.bool,

};
const mapStateToProps = (state) => {
  return {
    currentMovie: getCurrentMovie(state),
    isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddReviewClick() {
    dispatch(ActionCreator.addReview());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
