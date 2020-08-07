import * as React from 'react';
import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import PrivateRoute from '../private-route/private-route';
import FullVideoPlayer from '../full-video-player/full-video-player';
import ErrorScreen from '../error-msg/error-msg';
import Loading from '../loading/loading';

import history from '../../history';
import {AppRoute, AuthorizationStatus, ALL_GENRES} from '../../const';

import withReview from '../../hocs/with-review/with-review';
import withTabs from '../../hocs/with-tabs';
import withVideoControls from '../../hocs/with-full-video';

import {getMovies, getMovieCard, getIsLoadError, getIsLoading} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getIsMoviePlayerActive} from '../../reducer/app-state/selectors';
import {getAuthorizationStatus, getAuthorizationProgress} from '../../reducer/user/selectors';
import {Operations as UserOperation} from '../../reducer/user/user';
import {Operations as DataOperations} from '../../reducer/data/data';
import {MovieType} from '../../types';

const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);
const MoviePageWrapped = withTabs(MoviePage);

interface Props {
  isLoadError: boolean;
  isAuthorizationProgress: boolean;
  isLoading: boolean;
  authorizationStatus: string;
  setActiveGenre(genre: string): void;
  loadMovies(): void;
  movieCard: MovieType;
  isVideoPlayer: boolean;
  movies: Array<MovieType>;
  login: string;
}

const App: React.FC<Props> = (props: Props) => {
  const {movies, login,
    authorizationStatus, isLoadError,
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
  setActiveGenre(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
