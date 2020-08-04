import * as React from 'react';
import {MovieType, UserType} from "../../types";
import {connect} from "react-redux";
import {AppRoute, AuthorizationStatus, PageNames} from '../../const';
import {getAuthorizationStatus, getUserInfo} from '../../reducer/user/selectors';
import {Link} from "react-router-dom";

interface Props {
  currentPage: MovieType;
  isSignedIn: boolean;
  userInfo: UserType;
  children: JSX.Element;
}

const PageHeader: React.FC<Props> = (props: Props) => {
  const {currentPage, isSignedIn, userInfo, children}= props;

  const isSignInPage = currentPage === PageNames.SIGN_IN;
  const isMyListPage = currentPage === PageNames.MY_LIST;
  const isWithBreadcrumbs = currentPage === PageNames.ADD_REVIEW;

  const isWithTitle = isSignInPage || isMyListPage;

  const pageTitleElement = (
    <h1 className="page-title user-page__title">
      {isSignInPage && `Sign in`}
      {isMyListPage && `My list`}
    </h1>
  );

  const userBlockElement = (
    <div className="user-block">
      {isSignedIn &&
        <Link to={AppRoute.MY_LIST}>
          <div className="user-block__avatar">
            <img src={userInfo.avatarURL} alt={userInfo.name} width="63" height="63" />
          </div>
        </Link>}
      {!isSignedIn &&
        <Link
          to={AppRoute.LOGIN}
          className="user-block__link"
        >
        Sign in
        </Link>}
    </div>
  );

  return (
    <header className={`page-header ${isWithTitle ? `user-page__head` : `movie-card__head`}`}>
      <div className="logo">
        <Link to={AppRoute.ROOT}
          className="logo__link"

        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {isWithBreadcrumbs && children}
      {isSignInPage || isMyListPage ? pageTitleElement : null}
      {!isSignInPage && userBlockElement}
    </header>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state),
});

export {PageHeader};
export default connect(mapStateToProps)(PageHeader);
