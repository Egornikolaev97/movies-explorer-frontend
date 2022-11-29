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
import Preloader from '../Preloader/Preloader'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/currentUserContext';
import {
  serverErrors,
  updateErrors,
  loginErrors,
  registerErrors,
} from '../../constants/errors.js'

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
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
  // В переменную записывается сообщение об ошибке
  const [errorMessage, setErrorMessage] = useState('');
  // С помощью переменной проверяем, возникала ли ошибка при отрпавлении формы
  const [isError, setIsError] = useState(false);

  const [movies, setMovies] = useState('');

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      }).catch(err => console.log(err));
    }
  }, [loggedIn])

  // проверка авторизации при загрузке страницы
  useEffect(() => {
    tokenCheck();
  }, [])

  // проверка токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
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
  }

  // функция генерации сообщений об ошибке
  const errorGenerator = (errors, err) => {
    errors[err] !== 500
      ? setErrorMessage(errors[err])
      : setErrorMessage(serverErrors[500]);
    setIsError(true);
  }

  // логин
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    setIsError(false);
    mainApi
      .login(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          mainApi.setToken(res.token);
      })
      .catch((err) => {
        errorGenerator(loginErrors, err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

// регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    setIsError(false);
    mainApi
      .register(name, email, password)
      .then(() => {
          handleLogin({email, password});
      })
      .catch((err) => {
        errorGenerator(registerErrors, err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
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
  }

  // выход из аккаунта
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="App">
      <Header loggedIn={loggedIn} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/movies"
          element={
          <ProtectedRoute loggedIn={loggedIn}>
             <Movies
             movies={movies}
             />
          </ProtectedRoute>}
          />
          <Route path="/saved-movies"
          element={
          <ProtectedRoute loggedIn={loggedIn}>
             <SavedMovies />
          </ProtectedRoute>}
          />
          <Route path="/profile"
          element={
          <ProtectedRoute loggedIn={loggedIn}>
             <Profile
             handleLogOut={handleLogOut}
             handleUpdateUser={handleUpdateUser}
             userMessage={userMessage}
             errorMessage={errorMessage}
             isError={isError}
             />
          </ProtectedRoute>}
          />
          <Route path="/signup"
          element={
          <Register
          handleRegister={handleRegister}
          errorMessage={errorMessage}
          isError={isError}/>
          } />
          <Route path="/signin"
          element={
          <Login
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          isError={isError}
          />
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      <Preloader isLoading={isLoading} />
    </div>
      </CurrentUserContext.Provider>
  );
};

export default App;
