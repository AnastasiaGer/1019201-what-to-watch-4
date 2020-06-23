import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state =
      {
        activeMovieCard: false
      };

    this._handleTitleClick = this._handleTitleClick.bind(this);

  }

  _renderApp() {
    const {movies, movieCard} = this.props;
    if (this.state.activeMovieCard) {
      return (
        <MoviePage
          movie={this.state.activeMovieCard}
          movies={movies}
          onTitleClick={this._handleTitleClick}
        />
      );
    } else {
      return (
        <Main
          movieCard={movieCard}
          movies={movies}
          onTitleClick={this._handleTitleClick}
        />
      );
    }
  }
  render() {
    const {movies} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
            <MoviePage
              movie = {movies[0]}
              movies = {movies}
              onTitleClick={this._handleTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _handleTitleClick(movie) {
    this.setState({activeMovieCard: movie});
  }
}

App.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
