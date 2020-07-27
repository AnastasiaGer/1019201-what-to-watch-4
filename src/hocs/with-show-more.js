import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MAX_SHOWN_MOVIES_LIKE_THIS, PageNames} from '../const';
import {CustomPropTypes} from '../utils/props.js';
import ShowMoreButton from '../components/show-more-btn/show-more-btn.jsx';
import {getFilteredMoviesByGenre, getFilteredMoviesLikeThis} from '../reducer/data/selectors';
import {getCurrentPage, getActiveGenre} from '../reducer/app-state/selectors';


const withShowMore = (Component) => {
  class WithShowMore extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        shownMovies: props.movies.slice(0, MAX_SHOWN_MOVIES_LIKE_THIS),
      };

      this._renderButtonShowMore = this._renderButtonShowMore.bind(this);
      this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.setState({
          shownMovies: this.props.movies.slice(0, MAX_SHOWN_MOVIES_LIKE_THIS),
        });
      }
    }

    _handleShowMoreButtonClick() {
      this.setState((prevState) => ({
        shownMovies: [
          ...prevState.shownMovies,
          ...this.props.movies.slice(
              prevState.shownMovies.length,
              prevState.shownMovies.length + MAX_SHOWN_MOVIES_LIKE_THIS
          )
        ]
      }));
    }

    _renderButtonShowMore() {
      return (
        this.props.movies.length > this.state.shownMovies.length && <ShowMoreButton
          onShowMoreClick={this._handleShowMoreButtonClick}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          movies={this.state.shownMovies}
          render={this._renderButtonShowMore}
        />
      );
    }
  }

  WithShowMore.propTypes = {
    movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  };

  const mapStateToProps = (state) => {
    const currentPage = getCurrentPage(state);

    if (currentPage !== PageNames.MAIN) {
      return {
        movies: getFilteredMoviesLikeThis(state),
        activeGenre: getActiveGenre(state),
      };
    }

    return {
      movies: getFilteredMoviesByGenre(state),
      activeGenre: getActiveGenre(state),
    };
  };

  return connect(mapStateToProps)(WithShowMore);
};

export default withShowMore;
