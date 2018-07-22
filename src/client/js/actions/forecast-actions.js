
import { setLocation } from 'client/js/actions/location-actions';

import actionType from 'client/js/utils/action-types';

import request from 'shared/request';

export const requestForecast = () => ({
  type: actionType.REQUEST_FORECAST
});

export const errorRequestingForecast = () => ({
  type: actionType.ERROR_REQUESTING_FORECAST
});

export const setForecast = (location, data) => ({
  type: actionType.SET_FORECAST,
  location,
  data
});

const fetchForecast = (location) => {
  return (dispatch, getState) => {
    dispatch(requestForecast());

    return request(`/api/forecast/${location}`)
      .then(({ body }) => {

        dispatch(setForecast(location, body.list));

        return Promise.resolve();

      })
      .catch(() => {

        const error = 'There was a problem, please try again';

        dispatch(errorRequestingForecast());

        return Promise.reject(error);

      });
  }
}

export const shouldFetchForecast = (getState, location) => {
  const { forecasts } = getState();

  return !forecasts.data[location] && !forecasts.request.loading;
};

export default (location) => {
  return (dispatch, getState) => {
    if (shouldFetchForecast(getState, location)) {
      return dispatch(fetchForecast(location))
    }

    return Promise.resolve();
  }
};
