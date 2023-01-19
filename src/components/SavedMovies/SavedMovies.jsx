import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  allSavedMovies,
  keyword,
  searchSavedMovies,
  checkboxSaved,
  handleToggleCheckSaved,
  handleChangeCheckbox,
  search,
  setSearch,
}) => {
  return (
    <>
      <SearchForm
        searchSavedMovies={searchSavedMovies}
        keyword={keyword}
        search={search}
        setSearch={search}
        checkboxSaved={checkboxSaved}
        handleChangeCheckbox={handleChangeCheckbox}
        handleToggleCheckSaved={handleToggleCheckSaved}
      />
      <MoviesCardList
        search={search}
        setSearch={search}
        allSavedMovies={allSavedMovies}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        checkboxSaved={checkboxSaved}
      />
    </>
  );
};

export default SavedMovies;
