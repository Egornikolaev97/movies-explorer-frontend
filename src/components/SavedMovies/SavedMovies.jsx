import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, {useEffect} from 'react';

const SavedMovies = ({
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMoviesList,
  keyword,
  searchSavedMovies,
  checkboxSaved,
  setCheckboxSaved,
  handleToggleCheckSaved,
  handleChangeCheckbox,
  search,
  searchSaved,
  setSearchSavedReload,
  searchSavedReload,
  setSearch,
}) => {

  return (
    <>
      <SearchForm
        searchSavedMovies={searchSavedMovies}
        keyword={keyword}
        search={search}
        searchSaved={searchSaved}
        setSearch={search}
        checkboxSaved={checkboxSaved}
        setCheckboxSaved={setCheckboxSaved}
        handleChangeCheckbox={handleChangeCheckbox}
        handleToggleCheckSaved={handleToggleCheckSaved}
        setSearchSavedReload={setSearchSavedReload}
        searchSavedReload={searchSavedReload}
      />
      <MoviesCardList
        search={search}
        searchSaved={searchSaved}
        setSearch={search}
        savedMoviesList={savedMoviesList}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        checkboxSaved={checkboxSaved}
        setSearchSavedReload={setSearchSavedReload}
        searchSavedReload={searchSavedReload}
      />
    </>
  );
};

export default SavedMovies;
