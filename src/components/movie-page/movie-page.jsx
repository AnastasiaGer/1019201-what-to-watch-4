import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import PageOverview from '../page-overview/page-overview.jsx';
import PageDetails from '../page-details/page-details.jsx';
import PageReviews from '../page-reviews/page-reviews.jsx';

import MoviesList from '../movies-list/movies-list.jsx';
import PageFooter from '../page-footer/page-footer.jsx';
import PageHeader from '../page-header/page-header.jsx';
import MyListButton from '../my-list-button/my-list-button.jsx';

import {CustomPropTypes} from '../../utils/props.js';
import {AppRoute, AuthorizationStatus} from "../../const.js";

import {getCurrentMovie} from '../../reducer/app-state/selectors.js';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operations as DataOperations} from "../../reducer/data/data";

import withShowMore from '../../hocs/with-show-more';

const MoviesListWrapped = withShowMore(MoviesList);
class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {currentMovie, loadMovieInformation} = this.props;
    loadMovieInformation(currentMovie);
  }

  componentDidUpdate() {
    const {currentMovie, loadMovieInformation} = this.props;
    loadMovieInformation(currentMovie);

  }

  render() {
    const {currentMovie, movieReviews,
      renderTabs,
      activeTab, isSignedIn} = this.props;
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
      movieDurationTime, id
    } = currentMovie;

    const addReviewButton = (
      <Link to={`${AppRoute.MOVIE_PAGE}/${currentMovie.id}/review`}
        className="btn movie-card__button"
      >Add review
      </Link>
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

            <PageHeader isSignedIn={isSignedIn}/>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{date}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`${AppRoute.VIDEO_PLAYER}/${id}`}
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
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
  }
}

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool,
  loadMovieInformation: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    currentMovie: getCurrentMovie(state),
    isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadMovieInformation(movie) {
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.changeFilter(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
