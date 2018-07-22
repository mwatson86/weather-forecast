
import * as React from 'react';

import LocationForm from 'client/js/pages/partials/components/forms/location-form';

const Header = () => (
  <header className="l-header-main">
    <h1 className="l-header-main__title js-header-title">
      Weather Forecast
    </h1>
    <LocationForm />
  </header>
);

export default Header;
