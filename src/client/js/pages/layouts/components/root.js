
import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';

import WeekContainer from 'client/js/pages/partials/containers/week-container';
import DayContainer from 'client/js/pages/partials/containers/day-container';

const Root = ({ forecastExists, forecastRequest, location }) => {
  const dayExists = !!location.day;

  return (
    <div id="l-container">
      <Header />

      {forecastRequest.loading &&
        <div className="c-header">
          <p className="js-header-loading">Loading..</p>
        </div>
      }

      {forecastExists &&
        <React.Fragment>

          {!dayExists &&
            <WeekContainer />
          }

          {!!dayExists &&
            <DayContainer />
          }

        </React.Fragment>
      }

    </div>
  );
}

Root.propTypes = {
  forecastExists: PropTypes.bool.isRequired,
  forecastRequest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Root;
