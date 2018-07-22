
import actionType from 'client/js/utils/action-types';

export default (state = null, action = {}) => {

  switch(action.type) {

    case actionType.SET_LOCATION_DAY:
      return action.day;

    case actionType.SET_LOCATION_NAME:
    case actionType.REMOVE_LOCATION_DAY:
      return null;

    default:
      return state;
  }
};
