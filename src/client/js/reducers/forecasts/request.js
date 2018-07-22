
import actionType from '../../utils/action-types';

const initialState = {
  loading: false
};

export default (state = initialState, action = {}) => {

  switch(action.type) {

    case actionType.REQUEST_FORECAST:
      return {
        loading: true
      };

    case actionType.SET_FORECAST:
    case actionType.ERROR_REQUESTING_FORECAST:
      return {
        loading: false
      };

    default:
      return state;
  }
};
