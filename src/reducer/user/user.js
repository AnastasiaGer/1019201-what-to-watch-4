import {extend} from '../../utils/utils';
import {AuthorizationStatus} from '../../const';
import {ActionCreator as AppStateActionCreator} from '../app-state/app-state';
import {adaptUser} from '../../adapter/user';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  message: ``,
  authorizationError: false,
  userInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: `img/avatar.jpg`,
  },
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_AUTHOR_INFORMATION: `SET_AUTHOR_INFORMATION`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  SHOW_AUTHORIZATION_ERROR: `SHOW_AUTHORIZATION_ERROR`,
  DELETE_ERROR_AUTHORIZATION: `DELETE_ERROR_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  setAuthorInfo: (userData) => {
    return {
      type: ActionType.SET_AUTHOR_INFORMATION,
      payload: userData,
    };
  },
  setErrMessage: (msg) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: msg,
    };
  },

  showAuthorizationError: () => {
    return {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true
    };
  },

  deleteAuthorizationError: () => {
    return {
      type: ActionType.DELETE_ERROR_AUTHORIZATION,
      payload: false
    };
  }
};

const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setAuthorInfo(adaptUser(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(AppStateActionCreator.goToMainPage());
      })
      .catch(() => {
        dispatch(ActionCreator.showAuthorizationError());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_AUTHOR_INFORMATION:
      return extend(state, {
        userInfo: action.payload,
      });

    case ActionType.SET_ERROR_MESSAGE:
      return extend(state, {
        message: action.payload,
      });
    case ActionType.SHOW_AUTHORIZATION_ERROR:
      return extend(state, {
        authorizationError: action.payload,
      });
    case ActionType.DELETE_ERROR_AUTHORIZATION:
      return extend(state, {
        authorizationError: action.payload,
      });
  }

  return state;
};

export {initialState, reducer, ActionType, ActionCreator, Operations, AuthorizationStatus};
