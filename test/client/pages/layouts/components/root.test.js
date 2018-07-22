
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WeekContainer from 'client/js/pages/partials/containers/week-container';
import DayContainer from 'client/js/pages/partials/containers/day-container';

import Root from 'client/js/pages/layouts/components/root';

describe('Root component', () => {

  it('Header component exists', () => {

    const mockProps = {
      forecastExists: false,
      forecastRequest: {},
      location: {}
    };

    const component = shallow(<Root {...mockProps} />);

    const header = component.find('Header');

    expect(header.exists()).to.be.true;

  });

  it('Loading text exists', () => {

    const mockProps = {
      forecastExists: false,
      forecastRequest: {
        loading: true
      },
      location: {}
    };

    const component = shallow(<Root {...mockProps} />);

    const loading = component.find('.js-header-loading');

    expect(loading.text()).to.equal('Loading..');

  });

  it('WeekContainer component exists', () => {

    const mockProps = {
      forecastExists: true,
      forecastRequest: {
        loading: false
      },
      location: {}
    };

    const component = shallow(<Root {...mockProps} />);

    const week = component.find(WeekContainer);

    expect(week.exists()).to.be.true;

  });

  it('DayContainer component exists', () => {

    const mockProps = {
      forecastExists: true,
      forecastRequest: {
        loading: false
      },
      location: {
        day: 'MOCK_DAY'
      }
    };

    const component = shallow(<Root {...mockProps} />);

    const day = component.find(DayContainer);

    expect(day.exists()).to.be.true;

  });

});
