import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Header from '../Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

const App = () => {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = ({ email, password }) => {
        setLoggedIn(true);
        console.log({ email, password });
        navigate('/movies');
    };

    const handleRegister = ({ name, email, password }) => {
        setLoggedIn(true);
        console.log({ name, email, password });
        navigate('/movies');
    };

    const handleLogOut = () => {
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <div className='App'>
            <Header
            loggedIn={loggedIn}
            />
            <main className='content'>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/saved-movies' element={<SavedMovies />} />
                    <Route path='/profile' element={<Profile handleLogOut={handleLogOut}/>} />
                    <Route path='/signup' element={<Register handleRegister={handleRegister}/>} />
                    <Route path='/signin' element={<Login handleLogin={handleLogin}/>} />
                    <Route path='*' element={<PageNotFound/>} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;