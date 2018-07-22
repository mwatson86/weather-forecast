
import { expect } from 'chai';

import locationReducer from 'client/js/reducers/location';

import actionType from 'client/js/utils/action-types';

describe('location reducer', () => {

  it('combine reducers', () => {

    const result = locationReducer();

    expect(result).to.have.all.keys('day', 'name');

  });

});
