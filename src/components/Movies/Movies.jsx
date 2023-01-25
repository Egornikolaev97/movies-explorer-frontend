import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({
  searchMovies,
  movies,
  keyword,
  savedMovies,
  handleDeleteMovie,
  handleSaveMovie,
  checkbox,
  checkboxSaved,
  savedMoviesList,
  handleToggleCheckMovies,
  handleToggleCheckSaved,
  setSearch,
  search,
  searchSaved,
  isError,
  isErrorMovies,
  isLoading,
  searchSavedReload,
  setSearchSavedReload
}) => {
  return (
    <>
      <SearchForm
        searchMovies={searchMovies}
        keyword={keyword}
        checkbox={checkbox}
        handleToggleCheckMovies={handleToggleCheckMovies}
        handleToggleCheckSaved={handleToggleCheckSaved}
        search={search}
        setSearch={setSearch}
        searchSavedReload={searchSavedReload}
        setSearchSavedReload={setSearchSavedReload}

      />
      <MoviesCardList
        movies={movies}
        search={search}
        searchSaved={searchSaved}
        setSearch={setSearch}
        isError={isError}
        isErrorMovies={isErrorMovies}
        savedMovies={savedMovies}
        savedMoviesList={savedMoviesList}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        checkbox={checkbox}
        isLoading={isLoading}
        checkboxSaved={checkboxSaved}
        searchSavedReload={searchSavedReload}
        setSearchSavedReload={setSearchSavedReload}
      />
    </>
  );
};

export default Movies;
