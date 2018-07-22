
import { expect } from 'chai';

import locationDayReducer from 'client/js/reducers/location/day';

import actionType from 'client/js/utils/action-types';

describe('location day reducer', () => {

  const mockDay = 'MOCK_DAY';

  it('SET_LOCATION_DAY', () => {

    const stateBefore = null,
      stateAfter = mockDay;

    const action = {
      type: actionType.SET_LOCATION_DAY,
      day: mockDay
    }

    const result = locationDayReducer(stateBefore, action);

    expect(result).to.equal(stateAfter);

  });

  it('SET_LOCATION_NAME', () => {

    const stateBefore = mockDay,
      stateAfter = null;

    const action = {
      type: actionType.SET_LOCATION_NAME,
    };

    const result = locationDayReducer(stateBefore, action);

    expect(result).to.equal(stateAfter);

  });

  it('REMOVE_LOCATION_DAY', () => {

    const stateBefore = mockDay,
      stateAfter = null;

    const action = {
      type: actionType.REMOVE_LOCATION_DAY,
    };

    const result = locationDayReducer(stateBefore, action);

    expect(result).to.equal(stateAfter);

  });

  it('default', () => {

    const state = mockDay;

    const action = {
      type: 'MOCK_ACTION_TYPE'
    };

    const result = locationDayReducer(state, action);

    expect(result).to.equal(state);

  });

});
