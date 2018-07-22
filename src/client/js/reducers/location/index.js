
import { combineReducers } from 'redux';

import name from 'client/js/reducers/location/name';
import day from 'client/js/reducers/location/day';

export default combineReducers({
  name,
  day
});
