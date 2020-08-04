import * as React from "react";
import {MovieType, ReviewType} from "../../types";
import {connect} from 'react-redux';

import PageOverview from '../page-overview/page-overview';
import PageDetails from '../page-details/page-details';
import PageReviews from '../page-reviews/page-reviews';
import MoviesList from '../movies-list/movies-list';
import PageFooter from '../page-footer/page-footer';
import MovieCardHero from '../movie-card-hero/movie-card-hero';

import {PageNames} from "../../const";

import {ActionCreator} from '../../reducer/app-state/app-state';
import {Operations as DataOperations} from "../../reducer/data/data";

import withShowMore from '../../hocs/with-show-more';

interface Props {
  currentMovie: MovieType;
  loadMovieInformation(movie: MovieType): void;
  movieReviews: Array<ReviewType>;
  activeTab: string;
  renderTabs(): void;
}

const MoviesListWrapped = withShowMore(MoviesList);
class MoviePage extends React.PureComponent<Props, {}> {
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
          currentMovie={currentMovie}
          />;
        case `Details`:
          return <PageDetails
          currentMovie={currentMovie}
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

const mapDispatchToProps = (dispatch) => ({
  loadMovieInformation(movie) {
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.changeFilter(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(null, mapDispatchToProps)(MoviePage);
