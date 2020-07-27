import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {PageNames, AuthorizationStatus} from '../../const';
import {getCurrentPage} from '../../reducer/app-state/selectors';
import {getAuthorizationStatus, getErrMessage, getAuthorizationError, getAuthorInfo} from '../../reducer/user/selectors.js';
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import ErrorMsg from '../error-msg/error-msg.jsx';

const PageHeader = ({isMainPage, isSignInPage, isSignedIn, onSignInClick, showErrMessage, errMessage, userInfo}) => {

  const signInPageTitle = (
    <React.Fragment>
      <h1 className="page-title user-page__title">Sign in</h1>
    </React.Fragment>
  );

  const userBlockElement = (
    <React.Fragment>
      <div className="user-block">
        {isSignedIn &&
        <div className="user-block__avatar">
          <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>}
        {!isSignedIn &&
        <a
          href="sign-in.html"
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            onSignInClick();
          }}
        >Sign in</a>}
      </div>
    </React.Fragment>
  );

  return (
    <header className={`page-header ${isSignInPage ? `user-page__head` : `movie-card__head`}`}>
      <div className="logo">
        <a
          className="logo__link"
          href={!isMainPage ? `main.html` : null}
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {showErrMessage &&
      <ErrorMsg
        errMessage={errMessage}
      />
      }

      {isSignInPage ? signInPageTitle : userBlockElement}
    </header>
  );
};

PageHeader.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
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
  }).isRequired
};

const mapStateToProps = (state) => ({
  isMainPage: getCurrentPage(state) === PageNames.MAIN,
  isSignInPage: getCurrentPage(state) === PageNames.SIGN_IN,
  isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  showErrMessage: getAuthorizationError(state),
  errMessage: getErrMessage(state),
  userInfo: getAuthorInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.goToSignInPage());
  },
});

export {PageHeader};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
