import * as React from 'react';
import {MovieType} from '../../types';
import {connect} from 'react-redux';

import PageFooter from '../page-footer/page-footer';
import MoviesList from '../movies-list/movies-list';
import PageHeader from '../page-header/page-header';

import {PageNames} from '../../const';

import {getFavoriteMovies} from '../../reducer/data/selectors';

interface Props {
  favoriteMovies: Array<MovieType>;
}

const MyList: React.FC<Props> = (props: Props) => {
  const {favoriteMovies} = props;

  return (
    <React.Fragment>
      <div className="user-page">
        <PageHeader
          currentPage={PageNames.MY_LIST}
        />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MoviesList
            movies={favoriteMovies}
          />
        </section>

        <PageFooter />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
});

export default connect(mapStateToProps)(MyList);
