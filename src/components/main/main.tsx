import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import MoviesList from '../movies-list/movies-list';
import GenresList from "../genres-list/genres-list";
import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import MyListButton from '../my-list-button/my-list-button';

import {CustomPropTypes} from '../../utils/props';
import {AppRoute, PageNames} from "../../const";

import {getMovieCard} from '../../reducer/data/selectors';

import withTabs from '../../hocs/with-tabs';
import withShowMore from '../../hocs/with-show-more';

const MoviesListWrapped = withShowMore(withTabs(MoviesList));
const GenresListWrapped = withTabs(GenresList);

const Main = ({movieCard}) => {
  const {title, genre, date, background, poster, id} = movieCard;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={background} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <PageHeader currentPage={PageNames.MAIN}/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={poster} alt={title} width="218" height="327" />            </div>

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
                  movie={movieCard}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresListWrapped
          />

          <MoviesListWrapped
            currentPage={PageNames.MAIN}
          />
        </section>

        <PageFooter />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  onPlayClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  movieCard: getMovieCard(state),
});


export default connect(mapStateToProps)(Main);

