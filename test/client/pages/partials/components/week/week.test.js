
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Week from 'client/js/pages/partials/components/week';

describe('week component', () => {

  it('renders day x times', () => {

    const mockForecast = [{}, {}];

    const mockProps = {
      forecast: mockForecast
    };

    const component = shallow(<Week {...mockProps} />);

    const day = component.find('Day');

    expect(day).to.have.lengthOf(mockForecast.length);

  });

});
