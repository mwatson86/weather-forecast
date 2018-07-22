
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import InputField from 'client/js/pages/partials/components/forms/fields/input-field';

describe('input field', () => {

  const mockType = 'text',
    mockName = 'MOCK_NAME';

  const mockProps = {
    type: mockType,
    input: {
      name: mockName
    },
    label: '',
    meta: {
      error: '',
      touched: false
    }
  };

  context('label', () => {

    it('exists', () => {

      const mockLabel = 'MOCK_LABEL';

      const mockTestProps = {
        ...mockProps,
        label: mockLabel
      };

      const component = shallow(<InputField {...mockTestProps} />);

      const label = component.find('label');

      expect(label.exists()).to.be.true;

      expect(label.text()).to.equal(mockLabel);

    });

    it('does not exist', () => {

      const component = shallow(<InputField {...mockProps} />);

      const label = component.find('label');

      expect(label.exists()).to.be.false;

    });

  });

  context('input', () => {

    let input;

    before(() => {
      const component = shallow(<InputField {...mockProps} />);

      input = component.find('input');
    });

    it('input props included', () => expect(input.props()).to.contain(mockProps.input));
    it('type prop', () => expect(input.prop('type')).to.equal(mockType));
    it('id prop', () => expect(input.prop('id')).to.equal(`${mockName}-field`));

  });

  context('error', () => {

    it('exists', () => {

      const mockError = 'MOCK_ERROR';

      const mockTestProps = {
        ...mockProps,
        meta: {
          touched: true,
          error: mockError
        }
      };

      const component = shallow(<InputField {...mockTestProps} />);

      const error = component.find('.js-validation-error');

      expect(error.exists()).to.be.true;

      expect(error.text()).to.equal(mockError);

    });

    it('does not exist', () => {

      const component = shallow(<InputField {...mockProps} />);

      const error = component.find('.js-validation-error');

      expect(error.exists()).to.be.false;

    });

  });

});
