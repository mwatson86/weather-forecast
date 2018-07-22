
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import DayContainer from 'client/js/pages/partials/containers/day-container';

describe('Day container', () => {

  let component;

  const mockForecasts = 'MOCK_FORECASTS';

  const mockState = {
    forecasts: mockForecasts
  };

  before(() => {
    DayContainer.__Rewire__('getDayForecast', state => {
      expect(state).to.eql(mockState);

      return mockForecasts;
    })

    const mockStore = {
      dispatch: () => {},
      getState: () => mockState,
      subscribe: () => {}
    };

    const container = shallow(<DayContainer store={mockStore} />);

    component = container.find('Day');
  });

  after(() => {
    DayContainer.__ResetDependency__('getDayForecast');
  });

  it('forecast prop', () => {
    expect(component.prop('forecast')).to.equal(mockForecasts);
  });

});
