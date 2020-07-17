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
  }

  _renderApp() {
    const {
      movieCard, movies, onGenreItemClick, genres, activeGenre, shown, onShowMoreClick, movieReviews, currentMovieCard, handleMovieCardClick} = this.props;

    if (currentMovieCard) {
      return <MoviePageWrapped
        movieCard={movieCard}
        movies={movies}
        movieReviews={movieReviews}
        onMovieCardClick={handleMovieCardClick}
      />;
    }

    return (
      <Main
        movieCard={movieCard}
        movies={movies}
        onMovieCardClick={handleMovieCardClick}
        genres={genres}
        activeGenre={activeGenre}
        onGenreItemClick={onGenreItemClick}
        onShowMoreClick={onShowMoreClick}
        shown={shown}
      />
    );
  }

  handleMovieClick(movie) {
    this.setState({
      currentMovieCard: movie,
    });
  }

  render() {
    const {movieReviews, movies, currentMovieCard, handleMovieCardClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePageWrapped
              movie={currentMovieCard === null ? this.props.movies[0] : currentMovieCard}
              movies={movies}
              movieReviews={movieReviews}
              onMovieCardClick={handleMovieCardClick}
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
  movieReviews: CustomPropTypes.REVIEWS,
  activeGenre: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  onGenreItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  shown: PropTypes.number.isRequired,
  currentMovieCard: PropTypes.object,
  handleMovieCardClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  movies: state.movies,
  movieCard: state.movieCard,
  movieReviews: state.movieReviews,
  genres: state.genres,
  shown: state.cardsToShow,
  currentMovieCard: state.currentMovieCard,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.getFilmsByGenre(genre));
    dispatch(ActionCreator.changeFilter(genre));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },
  handleMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
