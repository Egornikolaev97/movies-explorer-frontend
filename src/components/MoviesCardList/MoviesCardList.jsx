import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({
  movies,
  savedMovies,
  handleDeleteMovie,
  handleSaveMovie,
  checkbox,
  checkboxSaved,
  moviesError,
}) => {
  // ширина экрана
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  // кол-во карточек на странице в зависимости от ширина экрана
  const [cardsAmount, setCardsAmount] = useState(12);
  // переменная для добавления карточек при нажатии кнопки "ещё"
  const [moreCards, setMoreCards] = useState(3);

  const location = useLocation();
  const savedMoviesPath = location.pathname === '/saved-movies';

  const changeWidth = () => {
    setTimeout(() => {
      setWidthWindow(window.innerWidth);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  useEffect(() => {
    changeCardsAmount();
  }, [widthWindow]);

  const changeCardsAmount = () => {
    if (widthWindow <= 480) {
      setCardsAmount(5);
      setMoreCards(2);
    } else if (widthWindow > 748 && widthWindow <= 1014) {
      setCardsAmount(8);
      setMoreCards(2);
    } else if (widthWindow >= 1015) {
      setCardsAmount(12);
      setMoreCards(3);
    }
  };

  // добавление карточек при клике на кнопку "ещё"
  const addMoreCards = () => {
    setCardsAmount((movies) => movies + moreCards);
  };

  // фильтрация по длительности. Фильмы < 40 мин - короткометражки.
  const filterByDuration = (array) => {
    return array.filter((item) => item.duration <= 40);
  };

  // отрисовка массива фильмов в зависимости от состояния чекбокса
  const moviesArray = checkbox ? filterByDuration(movies) : movies;
  const savedMoviesArr = checkboxSaved
    ? filterByDuration(savedMovies)
    : savedMovies;

  const moviesButton =
    cardsAmount >= movies?.length || cardsAmount >= moviesArray?.length
      ? 'movies__btn_hidden'
      : 'movies__btn';

  const spanNotFoundMovies = !moviesArray?.length
    ? 'movies__message'
    : 'movies__message_hidden';

  const textNotFoundMovies = !moviesArray?.length ? 'Ничего не найдено' : '';

  const spanNotFoundSaved = !savedMoviesArr?.length
    ? 'movies__message'
    : 'movies__message_hidden';

  const textNotFoundSaved = !savedMoviesArr?.length ? 'Ничего не найдено' : '';

  const spanErrorMovies = moviesError
    ? 'movies__message_error'
    : 'movies__message_hidden';

  const textErrorMovies = !moviesArray?.length
    ? `Во время запроса произошла ошибка. Возможно, проблема
     с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
    : '';

  const spanErrorSaved = moviesError
    ? 'movies__message_error'
    : 'movies__message_hidden';

  const textErrorSaved = !moviesArray?.length
    ? `Во время запроса произошла ошибка. Возможно, проблема
     с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
    : '';

  return (
    <section className='movies'>
      <div className='movies__container'>
        {savedMoviesPath ? (
          <>
            <ul className='movies__list'>
              {savedMoviesArr.map((movie) => {
                return (
                  <MoviesCard
                    savedMovies={savedMovies}
                    key={movie._id}
                    movie={movie}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                );
              })}
            </ul>
            <span className={spanErrorSaved}>{textErrorSaved}</span>
            <span className={spanNotFoundSaved}>{textNotFoundSaved}</span>
          </>
        ) : (
          <>
            <ul className='movies__list'>
              {moviesArray.length > 0 &&
                moviesArray.slice(0, cardsAmount).map((movie) => {
                  return (
                    <MoviesCard
                      savedMovies={savedMovies}
                      key={movie.id}
                      movie={movie}
                      handleSaveMovie={handleSaveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                    />
                  );
                })}
            </ul>
            <span className={spanErrorMovies}>{textErrorMovies}</span>
            <span className={spanNotFoundMovies}>{textNotFoundMovies}</span>
            <button
              className={moviesButton}
              type='button'
              onClick={addMoreCards}
            >
              Ещё
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
