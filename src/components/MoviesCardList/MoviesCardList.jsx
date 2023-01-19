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
  search,
  isError,
}) => {
  // ширина экрана
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  // кол-во карточек на странице в зависимости от ширина экрана
  const [cardsAmount, setCardsAmount] = useState(12);
  // переменная для добавления карточек при нажатии кнопки "ещё"
  const [moreCards, setMoreCards] = useState(3);
  // сообщение для пользователя при неудачном поиске
  const [moviesMessage, setMoviesMessage] = useState('');
  const [savedMoviesMessage, setSavedMoviesMessage] = useState('');

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

  useEffect(() => {
    if (search && !moviesArray?.length) {
      console.log(search);
      setMoviesMessage('Ничего не найдено :(');
    } else {
      setMoviesMessage('');
    }
  }, [search, moviesArray]);

  useEffect(() => {
    if (search && !savedMoviesArr?.length) {
      setSavedMoviesMessage('Ничего не найдено :(');
    } else {
      setSavedMoviesMessage('');
    }
  }, [search, savedMoviesArr]);

  const arrayLengthisNull = savedMoviesPath
    ? savedMoviesArr.length === 0
    : moviesArray.length === 0;

  const spanNotFound = arrayLengthisNull
    ? 'movies__message'
    : 'movies__message_hidden';

  const spanTextError = isError
    ? 'movies__message movies__message_error'
    : 'movies__message_hidden';

  const messageError =
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

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
            <span className={spanNotFound}>{!isError && savedMoviesMessage}</span>
            <span className={spanTextError}>{isError && messageError}</span>
          </>
        ) : (
          <>
            <ul className='movies__list'>
              {/* {moviesArray.length > 0 && */}
              {moviesArray.slice(0, cardsAmount).map((movie) => {
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
            <span className={spanNotFound}>{!isError && moviesMessage}</span>
            <span className={spanTextError}>{isError && messageError}</span>
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
