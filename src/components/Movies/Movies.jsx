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
  moviesError
}) => {

  return (
    <>
      <SearchForm
        searchMovies={searchMovies}
        keyword={keyword}
        checkbox={checkbox}
        handleToggleCheckMovies={handleToggleCheckMovies}
        handleToggleCheckSaved={handleToggleCheckSaved}
        />
      <MoviesCardList
        movies={movies}
        moviesError={moviesError}
        savedMovies={savedMovies}
        savedMoviesList={savedMoviesList}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        checkbox={checkbox}
        checkboxSaved={checkboxSaved}
      />
    </>
  );
};

export default Movies;
