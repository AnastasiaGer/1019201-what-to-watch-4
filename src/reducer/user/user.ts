import {extend} from '../../utils';
import {AuthorizationStatus} from '../../const';
import {adaptUser} from '../../adapters/user';
import {UserType} from '../../types';

interface UserActionInterface {
  type?: string;
  payload?: string | boolean | UserType;
}

interface InitialStateInterface {
  userInfo?: UserType;
  isAuthorizationError?: boolean;
  isAuthorizationProgress?: boolean;
  authorizationStatus?: string;
}

const initialState: InitialStateInterface = {
  authorizationStatus: ``,
  isAuthorizationError: false,
  isAuthorizationProgress: true,
  userInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatarURL: ``,
  },
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_AUTHOR_INFORMATION: `SET_AUTHOR_INFORMATION`,
  FINISH_AUTHORIZATION_PROGRESS: `FINISH_AUTHORIZATION_PROGRESS`,
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
  finishAuthorizationProgress: () => {
    return {
      type: ActionType.FINISH_AUTHORIZATION_PROGRESS,
      payload: false,
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
        dispatch(ActionCreator.finishAuthorizationProgress());
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
        dispatch(ActionCreator.finishAuthorizationProgress());
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setAuthorInfo(adaptUser(response.data)));
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

    case ActionType.FINISH_AUTHORIZATION_PROGRESS:
      return extend(state, {
        isAuthorizationProgress: action.payload,
      });
    case ActionType.SHOW_AUTHORIZATION_ERROR:
      return extend(state, {
        isAuthorizationError: action.payload,
      });
    case ActionType.DELETE_ERROR_AUTHORIZATION:
      return extend(state, {
        isAuthorizationError: action.payload,
      });
  }

  return state;
};

export {initialState, reducer, ActionType, ActionCreator, Operations, AuthorizationStatus};
