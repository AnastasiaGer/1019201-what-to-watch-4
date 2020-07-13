import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {CustomPropTypes} from '../../utils/props.js';
import withTabs from '../../hocs/with-tabs.js';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer.js";


const MoviePageWrapped = withTabs(MoviePage);
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  _renderMain() {
    const {movieCard, movies, onGenreItemClick, genres, activeGenre, shown, onShowMoreClick} = this.props;
    return (
      <Main
        movieCard={movieCard}
        movies={movies}
        onMovieCardClick={this.handleMovieClick}
        genres={genres}
        activeGenre={activeGenre}
        onGenreItemClick={onGenreItemClick}
        onShowMoreClick={onShowMoreClick}
        shown={shown}
      />
    );
  }

  _renderMoviePage() {
    const {movieCard, movies, movieReviews} = this.props;

    return (
      <MoviePageWrapped
        movieCard={movieCard}
        movies={movies}
        movieReviews={movieReviews}
        onMovieCardClick={this.handleMovieClick}
      />
    );
  }

  _renderApp() {
    const {activeCard} = this.state;

    const isActiveCard = activeCard ? this._renderMoviePage() : this._renderMain();
    return isActiveCard;
  }

  handleMovieClick(movie) {
    this.setState({
      activeCard: movie,
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
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  movieReviews: CustomPropTypes.REVIEWS,
  activeGenre: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  onGenreItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  shown: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  movies: state.movies,
  movieCard: state.movieCard,
  movieReviews: state.movieReviews,
  genres: state.genres,
  shown: state.cardsToShow,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.getFilmsByGenre(genre));
    dispatch(ActionCreator.changeFilter(genre));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
