
import * as React from 'react';

import { Field, propTypes, reduxForm, SubmissionError } from 'redux-form';

import { setLocation } from 'client/js/actions/location-actions';
import fetchForecast from 'client/js/actions/forecast-actions';

import InputField from 'client/js/pages/partials/components/forms/fields/input-field';

export class LocationFormNamedExport extends React.Component {

  static propTypes = {
    ...propTypes
  }

  static validate = (values) => {
    const errors = {};

    if (!values.location) {
      errors.location = 'This field is required';
    }

    return errors;
  }

  submit = (values, dispatch) => {
    const location = values.location.toLowerCase();

    return dispatch(fetchForecast(location))
      .then(() => dispatch(setLocation(location)))
      .catch(err => {

        throw new SubmissionError({
          location: err
        });

      });
  }

  render() {

    const {
      submitting,
      handleSubmit
    } = this.props;

    return (
      <form
        className="c-input-form js-form"
        onSubmit={handleSubmit(this.submit)}
      >

        <Field
          type="text"
          name="location"
          label="Location:"
          component={InputField}
        />

        <button
          type="submit"
          disabled={submitting}
        >
          Submit
        </button>

      </form>
    )
  }
}

export default reduxForm({
  form: 'locationForm',
  validate: LocationFormNamedExport.validate
})(LocationFormNamedExport);
