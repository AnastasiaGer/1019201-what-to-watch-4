import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {CustomPropTypes} from '../../utils/props.js';
import withTabs from '../../hocs/with-tabs.js';
import {connect} from "react-redux";
import {getMovies, getMovieCard, getMovieReviews} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getMoviesGenres} from '../../reducer/data/selectors';
import {getActiveGenre, getCurrentPage, getIsMoviePlayerActive} from '../../reducer/app-state/selectors';
import {PageNames, AppRoute} from '../../const';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import SignIn from '../sign-in/sign-in.jsx';
import {Operations as UserOperation} from '../../reducer/user/user';
import AddReview from '../add-review/add-review.jsx';
import withReview from '../../hocs/with-review.js';

import FullVideoPlayer from '../full-video-player/full-video-player.jsx';
import withVideoControls from '../../hocs/with-full-video.js';

const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);


const MoviePageWrapped = withTabs(MoviePage);
class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movieCard, movies, onGenreItemClick, genres, activeGenre, onShowMoreClick, movieReviews, currentPage, handleMovieCardClick, isVideoPlayer, onPlayButtonClick, handleCloseButtonClick, login} = this.props;

    if (isVideoPlayer) {
      return (
        <FullVideoPlayerWrapped
          movieCard={movieCard}
          onClosePlayerClick={handleCloseButtonClick}
        />
      );
    }

    switch (currentPage) {
      case PageNames.MAIN:
        return (
          <Main
            movieCard={movieCard}
            movies={movies}
            onMovieCardClick={handleMovieCardClick}
            genres={genres}
            activeGenre={activeGenre}
            onGenreItemClick={onGenreItemClick}
            onShowMoreClick={onShowMoreClick}
            onPlayClick={onPlayButtonClick}
          />
        );
      case PageNames.MOVIE_DETAILS:
        return (
          <MoviePageWrapped
            movieCard={movieCard}
            movies={movies}
            movieReviews={movieReviews}
            onMovieCardClick={handleMovieCardClick}
            onPlayClick={onPlayButtonClick}
          />
        );
      case PageNames.SIGN_IN:
        return (
          <SignIn
            onFormSubmit={login}
          />
        );
      case PageNames.ADD_REVIEW:
        return (
          <AddReviewWrapped />
        );
      default:
        return (
          <Main
            movieCard={movieCard}
            movies={movies}
            onMovieCardClick={handleMovieCardClick}
            genres={genres}
            activeGenre={activeGenre}
            onGenreItemClick={onGenreItemClick}
            onShowMoreClick={onShowMoreClick}
            onPlayClick={onPlayButtonClick}
          />
        );
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.MOVIE_PAGE}>
            <MoviePage />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
            />
          </Route>
          <Route exact path={AppRoute.VIDEO_PLAYER}>
            <MoviePageWrapped/>
          </Route>
          <Route exact path={AppRoute.MOVIE_REVIEW}>
            <AddReviewWrapped />
          </Route>
        </Switch>
      </Router>
    );
  }
}


App.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE),
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
  activeGenre: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  onGenreItemClick: PropTypes.func,
  onShowMoreClick: PropTypes.func,
  currentPage: PropTypes.string,
  handleMovieCardClick: PropTypes.func,
  onPlayButtonClick: PropTypes.func,
  handleCloseButtonClick: PropTypes.func,
  isVideoPlayer: PropTypes.bool,
  login: PropTypes.func,
  authorizationStatus: PropTypes.string,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  movieCard: getMovieCard(state),
  movieReviews: getMovieReviews(state),
  genres: getMoviesGenres(state),
  activeGenre: getActiveGenre(state),
  currentPage: getCurrentPage(state),
  isVideoPlayer: getIsMoviePlayerActive(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },
  handleMovieCardClick(movie) {
    dispatch(ActionCreator.changeMovieCard(movie));
  },
  onPlayButtonClick(isVideoPlayer) {
    dispatch(ActionCreator.playFullMovie(isVideoPlayer));
  },
  handleCloseButtonClick(isVideoPlayer) {
    dispatch(ActionCreator.closeFulMovie(isVideoPlayer));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
