
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import forecasts from 'client/js/reducers/forecasts';
import location from 'client/js/reducers/location';

export default combineReducers({
  form: formReducer,
  forecasts,
  location
});
