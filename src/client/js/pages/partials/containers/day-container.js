
import { connect } from 'react-redux';

import { getDayForecast } from 'client/js/reducers/forecasts';

import Day from 'client/js/pages/partials/components/day';

const mapStateToProps = (state) => ({
  forecast: getDayForecast(state)
});

export const dayContainer = () => connect(
  mapStateToProps
)(Day);

export default dayContainer();
