
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { setLocation } from 'client/js/actions/location-actions';

import LocationForm, { LocationFormNamedExport } from 'client/js/pages/partials/components/forms/location-form';
import InputField from 'client/js/pages/partials/components/forms/fields/input-field';

describe('location form', () => {

  const mockProps = {
    handleSubmit: () => {},
    submitting: false
  };

  context('validate', () => {

    it('location field is empty', () => {

      const fakeValues = {
        location: ''
      };

      const result = LocationFormNamedExport.validate(fakeValues);

      expect(result).to.eql({
        location: 'This field is required'
      });

    });

    it('location field has value', () => {

      const fakeValues = {
        location: 'MOCK_LOCATION'
      };

      const result = LocationFormNamedExport.validate(fakeValues);

      expect(result).to.eql({});

    });

  });

  context('submit', () => {

    const dispatchStub = sinon.stub();

    const mockLocation = 'MOCK_LOCATION';

    const fetchForecastAction = 'FETCH_FORECAST_ACTION'

    before(() => {

      LocationForm.__Rewire__('fetchForecast', location => {
        expect(location).to.equal(mockLocation.toLowerCase());

        return fetchForecastAction;
      });

    });

    after(() => LocationForm.__ResetDependency__('fetchForecast'));

    afterEach(() => dispatchStub.reset());

    it('resolve', done => {

      const component = shallow(<LocationFormNamedExport {...mockProps} />);

      const instance = component.instance();

      dispatchStub.returns(Promise.resolve())

      instance.submit({
        location: mockLocation
      }, dispatchStub)
        .then(() => {

          expect(dispatchStub.withArgs(fetchForecastAction).calledOnce).to.be.true;
          expect(dispatchStub.withArgs(setLocation(mockLocation.toLowerCase())).calledOnce).to.be.true;

          done();

        });

    });

    it('reject', done => {

      const mockError = 'MOCK_ERROR';

      const component = shallow(<LocationFormNamedExport {...mockProps} />);

      const instance = component.instance();

      dispatchStub.returns(Promise.reject(mockError));

      instance.submit({
        location: mockLocation
      }, dispatchStub)
        .catch(({ errors }) => {

          expect(errors.location).to.equal(mockError);

          expect(dispatchStub.withArgs(fetchForecastAction).calledOnce).to.be.true;

          done()

        });

    });

  });

  context('form', () => {

    it('onSubmit', () => {

      const handleSubmitStub = sinon.stub();

      const mockTestProps = {
        ...mockProps,
        handleSubmit: handleSubmitStub
      };

      const component = shallow(<LocationFormNamedExport {...mockTestProps} />);

      const instance = component.instance();

      component.find('.js-form').simulate('submit');

      expect(handleSubmitStub.withArgs(instance.submit).calledOnce).to.be.true;

    });

    context('Field', () => {

      let field;

      before(() => {
        const component = shallow(<LocationFormNamedExport {...mockProps} />);

        field = component.find('Field');
      });

      it('exists', () => expect(field.exists()).to.be.true);
      it('type prop', () => expect(field.prop('type')).to.equal('text'));
      it('name prop', () => expect(field.prop('name')).to.equal('location'));
      it('label prop', () => expect(field.prop('label')).to.equal('Location:'));
      it('component prop', () => expect(field.prop('component')).to.equal(InputField));

    });

    context('button', () => {

      it('exists', () => {

        const component = shallow(<LocationFormNamedExport {...mockProps} />);

        const button = component.find('button');

        expect(button.exists()).to.be.true;

      });

      it('disabled', () => {

        const mockTestProps = {
          ...mockProps,
          submitting: true
        };

        const component = shallow(<LocationFormNamedExport {...mockTestProps} />);

        const button = component.find('button');

        expect(button.prop('disabled')).to.be.true;

      });

      it('not disabled', () => {

        const component = shallow(<LocationFormNamedExport {...mockProps} />);

        const button = component.find('button');

        expect(button.prop('disabled')).to.be.false;

      });

    });

  });

});
