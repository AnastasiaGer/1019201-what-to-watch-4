import {initialState, ActionType, reducer, Operations} from './user';
import {AuthorizationStatus} from '../../const';
import {createAPI} from '../../api';
import MockAdapter from 'axios-mock-adapter';

describe(`User Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Reducer should show Auth Error`, () => {
    expect(reducer({
      isAuthorizationError: false,
    }, {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    })).toEqual({
      isAuthorizationError: true,
    });
  });

  it(`Reducer should get user data`, () => {
    expect(reducer({
      userInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      },
    }, {
      type: ActionType.SET_AUTHOR_INFORMATION,
      payload: {
        id: 1,
        email: `asdasda@sfdsf.ru`,
        name: `asdasda`,
        avatarUrl: `wtw/sfdsf.ru`,
      },
    })).toEqual({
      userInfo: {
        id: 1,
        email: `asdasda@sfdsf.ru`,
        name: `asdasda`,
        avatarUrl: `wtw/sfdsf.ru`,
      },
    });
  });

  it(`Reducer should clear Auth Error`, () => {
    expect(reducer({
      isAuthorizationError: true,
    }, {
      type: ActionType.DELETE_ERROR_AUTHORIZATION,
      payload: false,
    })).toEqual({
      isAuthorizationError: false,
    });
  });

  it(`Reducer should finish authorization progress after server response`, () => {
    expect(reducer({
      isAuthorizationProgress: true,
    }, {
      type: ActionType.FINISH_AUTHORIZATION_PROGRESS,
      payload: false,
    })).toEqual({
      isAuthorizationProgress: false,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Operation should check authorization`, () => {
    const api = createAPI(() => {});

    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operations.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return checkAuthorization(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(3);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.REQUIRED_AUTHORIZATION,
              payload: `AUTH`,
            });
          });
  });
});
