
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import LocationForm from 'client/js/pages/partials/components/forms/location-form';

import Header from 'client/js/pages/layouts/components/header';

describe('Header component', () => {

  it('title exists', () => {

    const component = shallow(<Header />);

    const title = component.find('.js-header-title');

    expect(title.text()).to.equal('Weather Forecast')

  });

  it('form component exists', () => {

    const component = shallow(<Header />);

    const form = component.find(LocationForm);

    expect(form.exists()).to.be.true;

  });

});
