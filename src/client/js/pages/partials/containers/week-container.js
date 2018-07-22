
import { connect } from 'react-redux';

import { getWeekForecast } from 'client/js/reducers/forecasts';

import Week from 'client/js/pages/partials/components/week';

const mapStateToProps = (state) => ({
  forecast: getWeekForecast(state)
});

export const weekContainer = () => connect(
  mapStateToProps
)(Week);

export default weekContainer();
