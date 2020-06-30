import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {PageNames} from '../../const.js';
import {CustomPropTypes} from '../../custom-prop-types.js';

import withTabs from '../../hocs/with-tabs.jsx';

const MoviePageWrapped = withTabs(MoviePage);
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: PageNames.MAIN,
      currentMovie: this.props.movieCard,
    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  _renderApp() {
    const {movieCard, movies, movieReviews} = this.props;
    const {currentPage, currentMovie} = this.state;

    if (currentPage === PageNames.MAIN) {
      return (
        <Main
          movieCard={movieCard}
          movies={movies}
          onMovieCardClick={this.handleMovieClick}
        />
      );
    }

    if (currentPage === PageNames.MOVIE_DETAIL) {
      return (
        <MoviePageWrapped
          movieCard={currentMovie}
          movies={movies}
          movieReviews={movieReviews}
        />
      );
    }

    return null;
  }

  handleMovieClick(movie) {
    this.setState({
      currentPage: PageNames.MOVIE_DETAIL,
      currentMovie: movie,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie">
            <MoviePageWrapped
              movieCard={this.state.currentMovie}
              movies={this.props.movies}
              onMovieCardClick={this.handleMovieClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  movieReviews: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
};
