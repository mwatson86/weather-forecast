
import actionType from 'client/js/utils/action-types';

export default (state = {}, action = {}) => {

  switch(action.type) {

    case actionType.SET_FORECAST:
      return {
        ...state,
        [action.location]: action.data
      };

    default:
      return state;
  }
};
