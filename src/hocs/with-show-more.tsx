import * as React from 'react';
import {connect} from 'react-redux';
import {MAX_SHOWN_MOVIES_LIKE_THIS, PageNames} from '../const';
import ShowMoreButton from '../components/show-more-btn/show-more-btn';
import {getFilteredMoviesByGenre, getFilteredMoviesLikeThis} from '../reducer/app-state/selectors';
import {MovieType} from '../types';

interface Props {
  movies: Array<MovieType>;
}

interface State {
  shownMovies: Array<MovieType>;
}

const withShowMore = (Component) => {
  class WithShowMore extends React.PureComponent<Props, State> {
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

  const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentPage !== PageNames.MAIN) {
      return {
        movies: getFilteredMoviesLikeThis(state),
      };
    }

    return {
      movies: getFilteredMoviesByGenre(state),
    };
  };

  return connect(mapStateToProps)(WithShowMore);
};

export default withShowMore;
