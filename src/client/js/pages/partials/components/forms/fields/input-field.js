
import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  input,
  label,
  type,
  meta
}) => (
  <React.Fragment>

    {!!label &&
      <label
        htmlFor={`${input.name}-field`}
      >
        {label}
      </label>
    }

    <input
      {...input}
      type={type}
      id={`${input.name}-field`}
    />

    {(meta.touched && meta.error) &&
      <p className="validation-error js-validation-error">
        {meta.error}
      </p>
    }

  </React.Fragment>
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default InputField;
