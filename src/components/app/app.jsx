import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import MoviePage from "../movie-page/movie-page.jsx";
import MyList from "../my-list/my-list.jsx";
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import PrivateRoute from "../private-route/private-route.jsx";
import FullVideoPlayer from '../full-video-player/full-video-player.jsx';

import {CustomPropTypes} from '../../utils/props.js';
import history from "../../history.js";
import {AppRoute, AuthorizationStatus} from '../../const';

import withReview from '../../hocs/with-review.js';
import withTabs from '../../hocs/with-tabs.js';
import withVideoControls from '../../hocs/with-full-video.js';

import {getMovies, getMovieCard, getMovieReviews} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getCurrentPage, getIsMoviePlayerActive} from '../../reducer/app-state/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operations as UserOperation} from '../../reducer/user/user';
import {Operations as DataOperations} from '../../reducer/data/data.js';

const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);
const MoviePageWrapped = withTabs(MoviePage);

const App = (props) => {
  const {
    login, authorizationStatus, movies,
    movieCard, onPlayButtonClick, movieReviews, handleCloseButtonClick, isVideoPlayer, loadMovies
  } = props;

  if (isVideoPlayer) {
    return (
      <FullVideoPlayerWrapped
        movieCard={movieCard}
        onClosePlayerClick={handleCloseButtonClick}
      />
    );
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={(routeProps) => {
            return <Main
              routeProps={routeProps}
              movieCard={movieCard}
              onPlayClick={onPlayButtonClick}
            />;
          }}>
        </Route>
        <Route exact path={AppRoute.LOGIN}
          render={() => {
            return authorizationStatus !== AuthorizationStatus.AUTH ?
              <SignIn
                onFormSubmit={login}
              /> :
              <Redirect
                to={AppRoute.ROOT}
              />;
          }}
        />
        <Route exact path={`${AppRoute.MOVIE_PAGE}/:id`}
          render={(routeProps) => {
            return <MoviePageWrapped
              routeProps={routeProps}
              movies={movies}
              movieReviews={movieReviews}
              onPlayClick={onPlayButtonClick}
            />;
          }}
        />
        <Route exact path={`${AppRoute.VIDEO_PLAYER}/:id`}
          render={(routeProps) => {
            return <FullVideoPlayerWrapped
              routeProps={routeProps}
              movieCard={movieCard}
              onClosePlayerClick={handleCloseButtonClick}
            />;
          }}
        />
        <PrivateRoute exact path={`${AppRoute.MOVIE_PAGE}/:id/review`}
          render={(routeProps) => {
            return <AddReviewWrapped
              routeProps={routeProps}
            />;
          }}>
        </PrivateRoute>
        <PrivateRoute
          exact path={AppRoute.MY_LIST}
          render={(routeProps) => {
            loadMovies();
            return <MyList
              routeProps={routeProps}
            />;
          }}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE),
  movieCard: CustomPropTypes.MOVIE,
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
  currentPage: PropTypes.string,
  onPlayButtonClick: PropTypes.func,
  handleCloseButtonClick: PropTypes.func,
  isVideoPlayer: PropTypes.bool,
  login: PropTypes.func,
  authorizationStatus: PropTypes.string,
  onReviewSubmit: PropTypes.func.isRequired,
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  movieCard: getMovieCard(state),
  movieReviews: getMovieReviews(state),
  currentPage: getCurrentPage(state),
  isVideoPlayer: getIsMoviePlayerActive(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovies() {
    dispatch(DataOperations.loadFavoriteMovies());
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
  onReviewSubmit(movieId, review) {
    dispatch(DataOperations.pushReview(movieId, review));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
