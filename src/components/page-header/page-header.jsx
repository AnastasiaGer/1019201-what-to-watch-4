import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {AppRoute, AuthorizationStatus} from '../../const';
import {getCurrentPage, getCurrentMovie} from '../../reducer/app-state/selectors';
import {getAuthorizationStatus, getErrMessage, getAuthorizationError, getAuthorInfo} from '../../reducer/user/selectors.js';
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import ErrorMsg from '../error-msg/error-msg.jsx';
import {Link} from "react-router-dom";
const PageHeader = ({isSignInPage, isSignedIn, onSignInClick, showErrMessage, errMessage, userInfo, movieTitle}) => {

  const signInPageTitle = (
    <React.Fragment>
      <h1 className="page-title user-page__title">Sign in</h1>
    </React.Fragment>
  );

  const userBlockElement = (
    <div className="user-block">
      {isSignedIn &&
        <div className="user-block__avatar">
          <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>}
      {!isSignedIn &&
        <Link to={AppRoute.LOGIN}
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            onSignInClick();
          }}
        >Sign in</Link>}
    </div>
  );

  const isReview = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">{movieTitle}</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={`page-header ${isSignInPage ? `user-page__head` : `movie-card__head`}`}>
      <div className="logo">
        <Link to={AppRoute.ROOT}
          className="logo__link"

        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {showErrMessage &&
      <ErrorMsg
        errMessage={errMessage}
      />
      }
      {isReview}
      {isSignInPage ? signInPageTitle : userBlockElement}
    </header>
  );
};

PageHeader.propTypes = {
  isSignInPage: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  showErrMessage: PropTypes.bool,
  errMessage: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  movieTitle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isSignInPage: getCurrentPage(state) === AppRoute.LOGIN,
  isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  showErrMessage: getAuthorizationError(state),
  errMessage: getErrMessage(state),
  userInfo: getAuthorInfo(state),
  movieTitle: getCurrentMovie(state).title,
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.goToSignInPage());
  },
});

export {PageHeader};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
