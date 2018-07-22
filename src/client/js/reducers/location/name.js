
import actionType from 'client/js/utils/action-types';

export default (state = null, action = {}) => {

  switch(action.type) {

    case actionType.SET_LOCATION_NAME:
      return action.location;

    case actionType.REQUEST_FORECAST:
      return null;

    default:
      return state;
  }
};
