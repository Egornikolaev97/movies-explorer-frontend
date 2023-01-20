import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import searchIcon from '../../images/searchIcon.svg';
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
  search,
  setSearch,
}) => {
  const [movieValues, setMovieValues] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

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

  const searchToggling = () => {
    moviesPath
    ? searchMovies(movieValues)
    : searchSavedMovies(movieValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMessage('');
    return movieValues
      ? searchToggling(movieValues)
      : setSearchMessage('Введите ключевое слово');
  };

  return (
    <section className='search content-page'>
      <div className='search__container'>
        <form
          className='search__form'
          action='search'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='search__item'>
            <img className='search__icon' src={searchIcon} alt='поиск' />
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
            <img className='search__icon' src={searchIcon} alt='поиск' />
          </button>
        </form>
        <span className='search__message'>{searchMessage}</span>
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
