import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/currentUserContext';

// import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

const App = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''})

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      }).catch(err => console.log(err));
    }
  }, [loggedIn])

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

  //логин
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  };

//регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(() => {
          handleLogin({email, password});
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  };

  //редактирование профиля
  const handleUpdateUser = ({ name, email }) => {
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
      }).catch(err => console.log(err));
  }

  const handleToggleSubmitButton = () => {
    setUpdate(!update);
  }

  //выход
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
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
             update={update}
             handleToggleSubmitButton={handleToggleSubmitButton}
             />
          </ProtectedRoute>}
          />
          <Route path="/signup" element={<Register handleRegister={handleRegister}/>} />
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      <Preloader isLoading={isLoading} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
