import React from 'react';
import css from './Filter.module.css';

const Filter = ({value, onChange}) => {
  return (
    <label className={css.labelFind}>
      Find contacts by name
      <input
        type="text"
        className={css.inputFind}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
