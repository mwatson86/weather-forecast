
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Hour from 'client/js/pages/partials/components/week/day';

describe('week day component', () => {

  const mockDay = 'MOCK_DAY',
    mockFormattedDay = 'MOCK_FORMATTED_DAY',
    mockConditions = 'MOCK_CONDITIONS';

  const mockMinTemp = 'MOCK_MIN_TEMP',
    mockMaxTemp = 'MOCK_MAX_TEMP';

  const mockMinWind = 'MOCK_MIN_WIND',
    mockMaxWind = 'MOCK_MAX_WIND';

  const mockProps = {
    day: mockDay,
    formattedDay: mockFormattedDay,
    conditions: mockConditions,
    temp: {
      min: mockMinTemp,
      max: mockMaxTemp
    },
    wind: {
      min: mockMinWind,
      max: mockMaxWind
    }
  };

  it('onClick of item', () => {

    const mockSetDay = sinon.stub();

    const mockTestProps = {
      ...mockProps,
      setDay: mockSetDay
    };

    const component = shallow(<Hour {...mockTestProps} />);

    component.find('.js-item-button').simulate('click');

    expect(mockSetDay.withArgs(mockDay).calledOnce).to.be.true;

  });

  it('day exists', () => {

    const component = shallow(<Hour {...mockProps} />);

    const day = component.find('.js-header-day');

    expect(day.text()).to.equal(mockFormattedDay);

  });

  it('conditions exists', () => {

    const component = shallow(<Hour {...mockProps} />);

    const conditions = component.find('.js-body-conditions');

    expect(conditions.text()).to.equal(mockConditions);

  });

  it('temp exists', () => {

    const component = shallow(<Hour {...mockProps} />);

    const temp = component.find('.js-body-temp');

    expect(temp.text()).to.equal(`${mockMinTemp} - ${mockMaxTemp}`);

  });

  it('wind exists', () => {

    const component = shallow(<Hour {...mockProps} />);

    const wind = component.find('.js-body-wind');

    expect(wind.text()).to.equal(`${mockMinWind} - ${mockMaxWind}`);

  });

});
