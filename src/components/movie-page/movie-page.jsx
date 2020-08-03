import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import PageOverview from '../page-overview/page-overview.jsx';
import PageDetails from '../page-details/page-details.jsx';
import PageReviews from '../page-reviews/page-reviews.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import PageFooter from '../page-footer/page-footer.jsx';
import MovieCardHero from '../movie-card-hero/movie-card-hero.jsx';

import {CustomPropTypes} from '../../utils/props.js';
import {PageNames} from "../../const.js";

import {ActionCreator} from '../../reducer/app-state/app-state';
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
      activeTab} = this.props;

    const renderActiveTab = () => {
      switch (activeTab) {
        case `Overview`:
          return <PageOverview
            rating={currentMovie.rating}
            scores={currentMovie.scores}
            description={currentMovie.description}
            director={currentMovie.director}
            starring={currentMovie.starring}
          />;
        case `Details`:
          return <PageDetails
            director={currentMovie.director}
            genre={currentMovie.genre}
            movieDurationTime={currentMovie.movieDurationTime}
            starring={currentMovie.starring}
            date={currentMovie.date}
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
          <MovieCardHero
            currentMovie={currentMovie}
          />

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={currentMovie.poster} alt={currentMovie.title} width="218" height="327" />
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
                currentPage={PageNames.MOVIE_DETAILS}
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
  loadMovieInformation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMovieInformation(movie) {
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.changeFilter(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(null, mapDispatchToProps)(MoviePage);
