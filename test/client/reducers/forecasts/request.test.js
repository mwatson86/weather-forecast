
import { expect } from 'chai';

import forecastsRequestReducer from 'client/js/reducers/forecasts/request';

import actionType from 'client/js/utils/action-types';

describe('forecasts request reducer', () => {

  it('REQUEST_FORECAST', () => {

    const stateBefore = {
      loading: false
    };

    const stateAfter = {
      loading: true
    };

    const action = {
      type: actionType.REQUEST_FORECAST
    };

    const result = forecastsRequestReducer(stateBefore, action);

    expect(result).to.eql(stateAfter);

  });

  it('SET_FORECAST', () => {

    const stateBefore = {
      loading: true
    };

    const stateAfter = {
      loading: false
    };

    const action = {
      type: actionType.SET_FORECAST
    };

    const result = forecastsRequestReducer(stateBefore, action);

    expect(result).to.eql(stateAfter);

  });

  it('ERROR_REQUESTING_FORECAST', () => {

    const stateBefore = {
      loading: true
    };

    const stateAfter = {
      loading: false
    };

    const action = {
      type: actionType.ERROR_REQUESTING_FORECAST
    };

    const result = forecastsRequestReducer(stateBefore, action);

    expect(result).to.eql(stateAfter);

  });

  it('default', () => {

    const state = {
      loading: true
    };

    const action = {
      type: 'MOCK_ACTION_TYPE'
    };

    const result = forecastsRequestReducer(state, action);

    expect(result).to.eql(state);

  });

});
