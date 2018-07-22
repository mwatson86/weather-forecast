
import * as React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';

import { setDay } from 'client/js/actions/location-actions';

import Day from 'client/js/pages/partials/components/week/day';

class Week extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    forecast: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.setDayActionCreator = bindActionCreators(setDay, dispatch);
  }

  render() {
    const { forecast } = this.props;

    return (
      <div className="c-list">
        {forecast.map((day, i) => (
          <Day
            key={`day-${i}`}
            setDay={this.setDayActionCreator}
            {...day}
          />
        ))}
      </div>
    );
  }
};

export default Week;
