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
import ErrorScreen from '../error-msg/error-msg.jsx';
import Loading from '../loading/loading.jsx';

import history from "../../history.js";
import {CustomPropTypes} from '../../utils/props.js';
import {AppRoute, AuthorizationStatus, ALL_GENRES} from '../../const';

import withReview from '../../hocs/with-review.js';
import withTabs from '../../hocs/with-tabs.js';
import withVideoControls from '../../hocs/with-full-video.js';

import {getMovies, getMovieCard, getIsLoadError, getIsLoading} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getIsMoviePlayerActive} from '../../reducer/app-state/selectors';
import {getAuthorizationStatus, getAuthorizationProgress} from '../../reducer/user/selectors';
import {Operations as UserOperation} from '../../reducer/user/user';
import {Operations as DataOperations} from '../../reducer/data/data.js';

const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);
const MoviePageWrapped = withTabs(MoviePage);

const App = (props) => {
  const {movies,
    login, authorizationStatus, isLoadError,
    movieCard, loadMovies, setActiveGenre, isAuthorizationProgress, isLoading
  } = props;

  const renderMainPage = () => {
    setActiveGenre(ALL_GENRES);
    return !isLoadError ? <Main /> : <ErrorScreen />;
  };

  return (
    <React.Fragment>
      {!isLoading && !isAuthorizationProgress ?
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}
              render={renderMainPage}
            />;
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
                const movieId = Number(routeProps.match.params.id);
                const currentMovie = movies.find((movie) => movie.id === movieId);
                return <MoviePageWrapped
                  routeProps={routeProps}

                  currentMovie={currentMovie}
                />;
              }}
            />
            <Route exact path={`${AppRoute.VIDEO_PLAYER}/:id`}
              render={(routeProps) => {
                return <FullVideoPlayerWrapped
                  routeProps={routeProps}
                  movieCard={movieCard}
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
            <Route component={ErrorScreen}
            />
          </Switch>
        </Router>
        : <Loading />}
    </React.Fragment>
  );
};

App.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  isVideoPlayer: PropTypes.bool,
  login: PropTypes.func,
  authorizationStatus: PropTypes.string,
  onReviewSubmit: PropTypes.func,
  loadMovies: PropTypes.func,
  isLoadError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isAuthorizationProgress: PropTypes.bool,
  setActiveGenre: PropTypes.func,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE),
};

const mapStateToProps = (state) => ({
  movieCard: getMovieCard(state),
  isVideoPlayer: getIsMoviePlayerActive(state),
  isAuthorizationProgress: getAuthorizationProgress(state),
  authorizationStatus: getAuthorizationStatus(state),
  isLoadError: getIsLoadError(state),
  isLoading: getIsLoading(state),
  movies: getMovies(state),
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
  setActiveGenre(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
