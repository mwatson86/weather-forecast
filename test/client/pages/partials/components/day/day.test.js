
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { removeDay } from 'client/js/actions/location-actions';

import Day from 'client/js/pages/partials/components/day';

describe('day component', () => {

  const mockFormattedDay = 'MOCK_FORMATTED_DAY';

  it('day exists', () => {

    const mockProps = {
      forecast: {
        formattedDay: mockFormattedDay,
        list: []
      }
    };

    const component = shallow(<Day {...mockProps} />);

    const day = component.find('.js-header-day');

    expect(day.text()).to.equal(mockFormattedDay);

  });

  context('button', () => {

    it('exists', () => {

      const mockProps = {
        forecast: {
          formattedDay: mockFormattedDay,
          list: []
        }
      };

      const component = shallow(<Day {...mockProps} />);

      const button = component.find('.js-header-button');

      expect(button.exists()).to.be.true;

    });

    it('onClick', () => {

      const dispatchStub = sinon.stub();

      const mockProps = {
        dispatch: dispatchStub,
        forecast: {
          formattedDay: mockFormattedDay,
          list: []
        }
      };

      const component = shallow(<Day {...mockProps} />);

      component.find('.js-header-button').simulate('click');

      expect(dispatchStub.withArgs(removeDay()).calledOnce).to.be.true;

    });

  });

  it('renders hour x times', () => {

    const mockList = [{}, {}];

    const mockProps = {
      forecast: {
        formattedDay: mockFormattedDay,
        list: mockList
      }
    };

    const component = shallow(<Day {...mockProps} />);

    const hour = component.find('Hour');

    expect(hour).to.have.lengthOf(mockList.length);

  });

});
