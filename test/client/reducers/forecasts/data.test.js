
import { expect } from 'chai';

import forecastsDataReducer from 'client/js/reducers/forecasts/data';

import actionType from 'client/js/utils/action-types';

describe('forecasts data reducer', () => {

  it('SET_FORECAST', () => {

    const mockLocation = 'MOCK_LOCATION',
      mockData = 'MOCK_DATA';

    const stateBefore = {
      prop1: 'value'
    };

    const stateAfter = {
      ...stateBefore,
      [mockLocation]: mockData
    };

    const action = {
      type: actionType.SET_FORECAST,
      location: mockLocation,
      data: mockData
    };

    const result = forecastsDataReducer(stateBefore, action);

    expect(result).to.eql(stateAfter);

  });

  it('default', () => {

    const state = {
      prop1: 'value'
    };

    const action = {
      type: 'MOCK_ACTION_TYPE'
    };

    const result = forecastsDataReducer(state, action);

    expect(result).to.eql(state);

  });

});
