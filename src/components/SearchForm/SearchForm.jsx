import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import search from '../../images/search.svg';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchForm = ({
  searchMovies,
  searchSavedMovies,
  keyword,
  checkbox,
  checkboxSaved,
  handleToggleCheckMovies,
  handleToggleCheckSaved,
}) => {
  const [movieValues, setMovieValues] = useState('');
  const location = useLocation();


  const moviesPath = location.pathname === '/movies';
  useEffect(() => {
    if (keyword && moviesPath) {
      setMovieValues(keyword);
      searchMovies(keyword);
    }
  }, []);

  const handleChange = (e) => {
    setMovieValues(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movieValues === '') {


    }
    if (moviesPath) {
      searchMovies(movieValues);
    } else {
      searchSavedMovies(movieValues);
    }
  }

  return (
    <section className='search content-page'>
      <div className='search__container'>
        <form
          className='search__form'
          action='search'
          onSubmit={handleSubmit}
        >
          <div className='search__item'>
            <img className='search__icon' src={search} alt='поиск' />
          </div>
          <input
            className='search__input'
            placeholder='Фильм'
            type='text'
            required
            value={movieValues}
            onChange={handleChange}
          />
          <button className='search__btn' type='submit'>
            <img className='search__icon' src={search} alt='поиск' />
          </button>
        </form>
        <FilterCheckBox
        checkbox={checkbox}
        checkboxSaved={checkboxSaved}
        handleToggleCheckMovies={handleToggleCheckMovies}
        handleToggleCheckSaved={handleToggleCheckSaved}
        />
      </div>
    </section>
  );
};

export default SearchForm;
