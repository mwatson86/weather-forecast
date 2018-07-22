
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from 'client/js/reducers';

import middleware from 'client/js/setup/middleware';

export default () => createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middleware()),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
