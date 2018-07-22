
import { connect } from 'react-redux';

import { getForecastByLocationName } from 'client/js/reducers/forecasts';

import OverviewComponent from 'client/js/pages/layouts/components/root';

const mapStateToProps = (state) => ({
  forecastExists: !!getForecastByLocationName(state),
  forecastRequest: state.forecasts.request,
  location: state.location
});

export const overviewContainer = () => connect(
  mapStateToProps
)(OverviewComponent);

export default overviewContainer();
