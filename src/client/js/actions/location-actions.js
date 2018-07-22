
import actionType from 'client/js/utils/action-types';

export const setLocation = (location) => ({
  type: actionType.SET_LOCATION_NAME,
  location
});

export const removeDay = () => ({
  type: actionType.REMOVE_LOCATION_DAY
});

export const setDay = day => ({
  type: actionType.SET_LOCATION_DAY,
  day
});
