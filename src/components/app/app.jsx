import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {PageNames} from '../../const.js';

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
    const {movieCard, movies} = this.props;
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
        <MoviePage
          movieCard={currentMovie} />
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
            <MoviePage
              movieCard={this.state.currentMovie}
              onMovieCardClick={this.handleMovieClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.string.isRequired,
    scores: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        rating: PropTypes.string.isRequired,
        scores: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired
  ).isRequired,
};
