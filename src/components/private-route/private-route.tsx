import * as React from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

interface Props {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<number> | null) => null;
}


const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
