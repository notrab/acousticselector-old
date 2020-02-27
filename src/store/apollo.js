import {ApolloClient, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHQL_URI
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      let token = localStorage.getItem('auth0IdToken');

      req.options.headers = {
        authorization: token ? `Bearer ${token}` : null,
        ...req.options.headers
      };

      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface,
  initialState: window.__APOLLO_STATE__,
  dataIdFromObject: o => o._id,
  connectToDevTools: process.env.NODE_ENV === 'development'
});

export default client;
