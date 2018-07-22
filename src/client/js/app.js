
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from 'client/js/setup/store';

import RootContainer from 'client/js/pages/layouts/containers/root-container';

import 'client/scss/style.scss';

const Component = () => {
  const store = createStore();

  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

ReactDOM.render(<Component />, document.getElementById('root'));
