
import React from 'react';
import PropTypes from 'prop-types';

const Hour = ({ formattedHour, temp, conditions, wind }) => (
  <div className="c-list__item">
    <div className="c-list__item-header">
      <h3 className="js-header-hour">{formattedHour}</h3>
    </div>
    <div className="c-list__item-body">
      <p className="js-body-conditions">{conditions}</p>
      <p className="js-body-temp">{temp.min} - {temp.max}</p>
      <p className="js-body-wind">{wind}</p>
    </div>
  </div>
);

Hour.propTypes = {
  formattedHour: PropTypes.string.isRequired,
  temp: PropTypes.object.isRequired,
  conditions: PropTypes.string.isRequired,
  wind: PropTypes.string.isRequired
};

export default Hour;
