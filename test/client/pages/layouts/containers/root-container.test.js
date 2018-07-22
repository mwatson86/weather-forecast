
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import RootContainer from 'client/js/pages/layouts/containers/root-container';

describe('Root container', () => {

  let component;

  const mockForecastsRequest = {
    loading: false
  };

  const mockLocation = {
    name: 'MOCK_LOCATION_NAME'
  };

  const mockState = {
    forecasts: {
      request: mockForecastsRequest
    },
    location: mockLocation
  };

  before(() => {
    RootContainer.__Rewire__('getForecastByLocationName', state => {
      expect(state).to.eql(mockState);

      return {
        mock: 'forecasts'
      };
    })

    const mockStore = {
      dispatch: () => {},
      getState: () => mockState,
      subscribe: () => {}
    };

    const container = shallow(<RootContainer store={mockStore} />);

    component = container.find('Root');
  });

  after(() => {
    RootContainer.__ResetDependency__('getForecastByLocationName');
  });

  it('forecastExists prop', () => {
    expect(component.prop('forecastExists')).to.be.true;
  });

  it('forecastRequest prop', () => {
    expect(component.prop('forecastRequest')).to.eql(mockForecastsRequest);
  });

  it('location prop', () => {
    expect(component.prop('location')).to.eql(mockLocation);
  });

});
