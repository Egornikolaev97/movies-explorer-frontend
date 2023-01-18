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
}) => {

  return (
    <>
      <SearchForm
        searchSavedMovies={searchSavedMovies}
        keyword={keyword}
        checkboxSaved={checkboxSaved}
        handleChangeCheckbox={handleChangeCheckbox}
        handleToggleCheckSaved={handleToggleCheckSaved}
      />
      <MoviesCardList
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
