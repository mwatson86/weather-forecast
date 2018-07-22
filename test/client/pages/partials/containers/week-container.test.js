
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WeekContainer from 'client/js/pages/partials/containers/week-container';

describe('Week container', () => {

  let component;

  const mockForecasts = 'MOCK_FORECASTS';

  const mockState = {
    forecasts: mockForecasts
  };

  before(() => {
    WeekContainer.__Rewire__('getWeekForecast', state => {
      expect(state).to.eql(mockState);

      return mockForecasts;
    })

    const mockStore = {
      dispatch: () => {},
      getState: () => mockState,
      subscribe: () => {}
    };

    const container = shallow(<WeekContainer store={mockStore} />);

    component = container.find('Week');
  });

  after(() => {
    WeekContainer.__ResetDependency__('getWeekForecast');
  });

  it('forecast prop', () => {
    expect(component.prop('forecast')).to.equal(mockForecasts);
  });

});
