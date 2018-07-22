
import * as React from 'react';
import PropTypes from 'prop-types';

import { removeDay } from 'client/js/actions/location-actions';

import Hour from 'client/js/pages/partials/components/day/hour';

class Day extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    forecast: PropTypes.object.isRequired
  }

  handleClick = () => {
    const { dispatch } = this.props;

    dispatch(removeDay());
  }

  render() {
    const { forecast } = this.props;

    return (
      <React.Fragment>

        <div className="c-header">
          <h2 className="js-header-day">{forecast.formattedDay}</h2>

          <button
            type="button"
            className="c-header__button js-header-button"
            onClick={this.handleClick}
          >
            Go back
          </button>
        </div>

        <div className="c-list">
          {forecast.list.map((item, i) => (
            <Hour
              key={`hour-${i}`}
              {...item}
            />
          ))}
        </div>

      </React.Fragment>
    );
  }
};

export default Day;
