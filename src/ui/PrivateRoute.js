import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, currentUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      currentUser
        ? <Component currentUser={currentUser} {...props} />
        : <Redirect
            to={{
              pathname: '/signup',
              state: {from: props.location}
            }}
          />}
  />;

export default PrivateRoute;
