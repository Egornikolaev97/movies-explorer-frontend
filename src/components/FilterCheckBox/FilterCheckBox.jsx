import './FilterCheckBox.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const FilterCheckBox = ({
  checkbox,
  checkboxSaved,
  handleToggleCheckMovies,
  handleToggleCheckSaved,
}) => {

  const location = useLocation();
  const moviesPath = location.pathname === '/movies';
  const status = moviesPath ? checkbox : checkboxSaved

  const handleChange = (e) => {
    if (moviesPath) {
      handleToggleCheckMovies(e.target.checkbox);
    } else {
      handleToggleCheckSaved(e.target.checkboxSaved);
    }
  }

  return (
    <div className='checkbox'>
      <input
        type='checkbox'
        id='checkbox'
        className='checkbox__input'
        checked={status}
        onChange={handleChange}
      />
      <label htmlFor='checkbox' className='checkbox__label'>
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckBox;
