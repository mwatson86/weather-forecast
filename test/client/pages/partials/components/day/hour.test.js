
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Hour from 'client/js/pages/partials/components/day/hour';

describe('day hour component', () => {

  const mockFormattedHour = 'MOCK_FORMATTED_HOUR',
    mockConditions = 'MOCK_CONDITIONS',
    mockWind = 'MOCK_WIND';

  const mockMinTemp = 'MOCK_MIN_TEMP',
    mockMaxTemp = 'MOCK_MAX_TEMP';

  const mockProps = {
    formattedHour: mockFormattedHour,
    conditions: mockConditions,
    temp: {
      min: mockMinTemp,
      max: mockMaxTemp
    },
    wind: mockWind
  };

  it('hour exists', () => {

    const component = shallow(<Hour {...mockProps} />);

    const hour = component.find('.js-header-hour');

    expect(hour.text()).to.equal(mockFormattedHour);

  });

  it('conditions exist', () => {

    const component = shallow(<Hour {...mockProps} />);

    const conditions = component.find('.js-body-conditions');

    expect(conditions.text()).to.equal(mockConditions);

  });

  it('temp exist', () => {

    const component = shallow(<Hour {...mockProps} />);

    const temp = component.find('.js-body-temp');

    expect(temp.text()).to.equal(`${mockMinTemp} - ${mockMaxTemp}`);

  });

  it('wind exist', () => {

    const component = shallow(<Hour {...mockProps} />);

    const wind = component.find('.js-body-wind');

    expect(wind.text()).to.equal(mockWind);

  });

});
