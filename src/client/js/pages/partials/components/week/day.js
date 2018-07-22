
import * as React from 'react';
import PropTypes from 'prop-types';

class Day extends React.Component {

  static propTypes = {
    setDay: PropTypes.func.isRequired,
    day: PropTypes.string.isRequired,
    formattedDay: PropTypes.string.isRequired,
    conditions: PropTypes.string.isRequired,
    temp: PropTypes.object.isRequired,
    wind: PropTypes.object.isRequired
  }

  handleClick = () => {
    const { day, setDay } = this.props;

    setDay(day);
  }

  render() {
    const { formattedDay, temp, conditions, wind } = this.props;

    return (
      <div
        className="c-list__item js-item-button"
        onClick={this.handleClick}
      >
        <div className="c-list__item-header">
          <h3 className="js-header-day">{formattedDay}</h3>
        </div>
        <div className="c-list__item-body">
          <p className="js-body-conditions">{conditions}</p>
          <p className="js-body-temp">{temp.min} - {temp.max}</p>
          <p className="js-body-wind">{wind.min} - {wind.max}</p>
        </div>
      </div>
    );
  }
};

export default Day;
