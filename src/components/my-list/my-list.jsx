import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PageFooter from '../page-footer/page-footer.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import PageHeader from '../page-header/page-header.jsx';

import {PageNames} from '../../const';
import {CustomPropTypes} from '../../utils/props.js';

import {getFavoriteMovies} from '../../reducer/data/selectors.js';


const MyList = (props) => {
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
            render={() => {}} />
        </section>

        <PageFooter />
      </div>
    </React.Fragment>
  );
};

MyList.propTypes = {
  favoriteMovies: PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.MOVIE),
    PropTypes.arrayOf(undefined)
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
});

export default connect(mapStateToProps)(MyList);
