
import { expect } from 'chai';

import locationNameReducer from 'client/js/reducers/location/name';

import actionType from 'client/js/utils/action-types';

describe('location name reducer', () => {

  const mockName = 'MOCK_NAME';

  it('SET_LOCATION_NAME', () => {

    const stateBefore = null,
      stateAfter = mockName;

    const action = {
      type: actionType.SET_LOCATION_NAME,
      location: mockName
    }

    const result = locationNameReducer(stateBefore, action);

    expect(result).to.equal(stateAfter);

  });

  it('REQUEST_FORECAST', () => {

    const stateBefore = mockName,
      stateAfter = null;

    const action = {
      type: actionType.REQUEST_FORECAST,
    };

    const result = locationNameReducer(stateBefore, action);

    expect(result).to.equal(stateAfter);

  });

  it('default', () => {

    const state = mockName;

    const action = {
      type: 'MOCK_ACTION_TYPE'
    };

    const result = locationNameReducer(state, action);

    expect(result).to.equal(state);

  });

});
