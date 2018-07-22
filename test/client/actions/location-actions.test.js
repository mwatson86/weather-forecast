
import { expect } from 'chai';

import * as locationActions from 'client/js/actions/location-actions';

import actionType from 'client/js/utils/action-types';

describe('location actions', () => {

  context('action creators', () => {

    it('set location', () => {

      const mockLocation = 'MOCK_LOCATION';

      const result = locationActions.setLocation(mockLocation);

      expect(result).to.eql({
        type: actionType.SET_LOCATION_NAME,
        location: mockLocation
      });

    });

    it('remove day', () => {

      const result = locationActions.removeDay();

      expect(result).to.eql({
        type: actionType.REMOVE_LOCATION_DAY
      });

    });

    it('set day', () => {

      const mockDay = 'MOCK_DAY';

      const result = locationActions.setDay(mockDay);

      expect(result).to.eql({
        type: actionType.SET_LOCATION_DAY,
        day: mockDay
      });

    });

  });

});
