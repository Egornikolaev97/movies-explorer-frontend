/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/currentUserContext';
import {
  serverErrors,
  updateErrors,
  loginErrors,
  registerErrors,
} from '../../constants/errors.js';
// импорт апишек
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

const App = () => {
  const navigate = useNavigate();
  // С помощью переменной проверяем, авторизирован ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  // С Помощью переменной задаем отображение прелоудера
  const [isLoading, setIsLoading] = useState(false);
  // С помощью переменной проверем, отображается ли сообщение об успешном изменении данных.
  const [userMessage, setUserMessage] = useState(false);
  // В переменную сохраняется данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: '',
  });
  // В переменную записывается сообщение об ошибке
  const [errorMessage, setErrorMessage] = useState('');
  // С помощью переменной проверяем, возникала ли ошибка при отрпавлении формы
  const [isError, setIsError] = useState(false);
  // Проверяем, завершился ли поиск
  const [search, setSearch] = useState(false);
  // переменные для фильмов
  const [movies, setMovies] = useState([]);
  // переменные для сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  // ключевое слово/симфол импута
  const keyword = localStorage.getItem('keyword');
  // переменные для чекбокса
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxSaved, setCheckboxSaved] = useState(false);

  // Редирект на страницу с фильмами, если юзер залогинен
  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  // Получение данных пользователя при загрузке страницы
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
      mainApi
        .getMovies()
        .then((res) => {
          setSavedMovies(res.data.reverse());
          setSavedMoviesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // загрузка состояния импута и чекбокса из локального хранилища при загрузки страницы
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('filteredMovies'))) {
      setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
      setCheckbox(JSON.parse(localStorage.getItem('checkbox')));
      setCheckboxSaved(JSON.parse(localStorage.getItem('checkboxSaved')));
    }
  }, []);

  // проверка авторизации при загрузке страницы
  useEffect(() => {
    tokenCheck();
  }, []);

  // проверка токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  // генерация сообщений об ошибке
  const errorGenerator = (errors, err) => {
    errors[err] !== 500
      ? setErrorMessage(errors[err])
      : setErrorMessage(serverErrors[500]);
    setIsError(true);
  };

  // логин
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setIsError(false);
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        mainApi.setToken(res.token);
      })
      .catch((err) => {
        errorGenerator(loginErrors, err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    setIsError(false);
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        errorGenerator(registerErrors, err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // редактирование профиля
  const handleUpdateUser = ({ name, email }) => {
    setIsError(false);
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setUserMessage(true);
      })
      .catch((err) => {
        errorGenerator(updateErrors, err);
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => setUserMessage(false), 1000);
      });
  };

  // выход из аккаунта и очистка локального хранилища
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('keyword');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('moviesArray');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('checkboxSaved');
    setMovies([]);
    setSavedMovies([]);
    setSavedMoviesList([]);
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
  };

  // фильтрация по ключевым словам
  const filterMovies = (movies, name) => {
    return movies.filter((item) =>
      item.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  };

  // поиск по всем фильмам
  const searchMovies = (name) => {
    setSearch(false);
    setIsError(false);
    if (!JSON.parse(localStorage.getItem('moviesArray'))) {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((data) => {
          localStorage.setItem('moviesArray', JSON.stringify(data));
          setIsLoading(true);
          setMovies(
            filterMovies(JSON.parse(localStorage.getItem('moviesArray')), name)
          );
          localStorage.setItem('keyword', name);
          localStorage.setItem('filteredMovies', JSON.stringify(movies));
          localStorage.setItem('checkbox', checkbox);
        })
        .finally(() => setIsLoading(false))
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
    } else {
      setMovies(
        filterMovies(JSON.parse(localStorage.getItem('moviesArray')), name)
      );
      localStorage.setItem('keyword', name);
      localStorage.setItem('filteredMovies', JSON.stringify(movies));
      localStorage.setItem('checkbox', checkbox);
    }
    setSearch(true);
  };

  // фильтрация по юзеру
  const filterByOwner = (movies, currentUser) => {
    return movies.filter((movie) => {
      return movie.owner === currentUser._id;
    });
  };

  // поиск по сохраненным фильмам
  const searchSavedMovies = (name) => {
    setSearch(false);
    mainApi
    .getMovies()
    .then(() => {
        localStorage.setItem('checkboxSaved', checkboxSaved);
        const filteredByOnwer = filterByOwner(savedMoviesList, currentUser);
        const filteredSavedMovies = filterMovies(filteredByOnwer, name);
        setSavedMovies(filteredSavedMovies);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
    const filteredSavedMovies = filterMovies(savedMoviesList, name);
    setSavedMovies(filteredSavedMovies)
    setSearch(true);
  };

  // сохранение фильмов
  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((newMovies) => {
        setSavedMovies([newMovies, ...savedMovies]);
        setSavedMoviesList([newMovies, ...savedMoviesList]);
      })
      .catch((err) => console.log(err));
  };

  // удаление фильмов
  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
        setSavedMoviesList(
          savedMoviesList.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // переключение чекбокса для всех фильмов и сохраненных фильмов
  const handleToggleCheckMovies = () => {
    setCheckbox(!checkbox);
    localStorage.setItem('checkbox', !checkbox);
  };

  const handleToggleCheckSaved = () => {
    setCheckboxSaved(!checkboxSaved);
    localStorage.setItem('checkboxSaved', !checkboxSaved);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Header loggedIn={loggedIn} />
        <main className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route
              path='/movies'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    movies={movies}
                    search={search}
                    setSearch={search}
                    isError={isError}
                    isLoading={isLoading}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSaveMovie={handleSaveMovie}
                    searchMovies={searchMovies}
                    savedMovies={savedMovies}
                    savedMoviesList={savedMoviesList}
                    keyword={keyword}
                    checkbox={checkbox}
                    checkboxSaved={checkboxSaved}
                    handleToggleCheckMovies={handleToggleCheckMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    searchSavedMovies={searchSavedMovies}
                    search={search}
                    setSearch={search}
                    keyword={keyword}
                    savedMovies={savedMovies}
                    savedMoviesList={savedMoviesList}
                    handleDeleteMovie={handleDeleteMovie}
                    checkboxSaved={checkboxSaved}
                    handleToggleCheckSaved={handleToggleCheckSaved}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    handleLogOut={handleLogOut}
                    handleUpdateUser={handleUpdateUser}
                    userMessage={userMessage}
                    errorMessage={errorMessage}
                    isError={isError}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <Register
                  handleRegister={handleRegister}
                  errorMessage={errorMessage}
                  isError={isError}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                  handleLogin={handleLogin}
                  errorMessage={errorMessage}
                  isError={isError}
                />
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
        <Preloader isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
