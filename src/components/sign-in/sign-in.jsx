import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/user/user.js';
import {getAuthorizationError} from '../../reducer/user/selectors.js';
import PageHeader from '../page-header/page-header.jsx';
import PageFooter from '../page-footer/page-footer.jsx';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  _handleSubmitClick(evt) {
    const {onFormSubmit} = this.props;

    const userSignInData = {
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    };

    evt.preventDefault();
    onFormSubmit(userSignInData);
  }

  render() {
    const {authorizationError, deleteAuthError} = this.props;

    return (
      <React.Fragment>
        <div className="user-page">
          <PageHeader />
          <div className="sign-in user-page__content">
            <form
              action="#"
              className="sign-in__form"
              onSubmit={this._handleSubmitClick}
              onChange={deleteAuthError}>
              {authorizationError ?
                <div className="sign-in__message">
                  <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
                </div> : ``}
              <div className="sign-in__fields">
                <div className={authorizationError ? `sign-in__field sign-in__field--error` : `sign-in__field`}>
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                    id="user-email" ref={this.loginRef} required/>
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                    id="user-password" ref={this.passwordRef} required/>
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit">Sign in</button>
              </div>
            </form>
          </div>
          <PageFooter />
        </div>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  authorizationError: PropTypes.bool.isRequired,
  deleteAuthError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationError: getAuthorizationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAuthError() {
    dispatch(ActionCreator.clearAuthorizationError());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
