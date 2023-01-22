import { useLocation, NavLink } from 'react-router-dom';
import './Navigation.css';
import React from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Navigation = ({ loggedIn }) => {
  return <>{!loggedIn ? <NavigationStart /> : <NavigationMovies />}</>;
};

const setActiveLink = ({ isActive }) =>
  isActive ? 'navigation__link-active' : 'navigation__link';

const NavigationStart = () => {
  return (
    <>
      <nav className='navigation'>
        <div className='navgiataion__container'>
          <NavLink
            className='navigation__link navigation__link_register'
            to='/signup'
          >
            Регистрация
          </NavLink>
          <NavLink className='navigation__entry-btn' to='/signin'>
            Войти
          </NavLink>
        </div>
      </nav>
    </>
  );
};

const NavigationMovies = () => {
  const location = useLocation();
  const navigationItemDark = `navigation__item ${
    location.pathname !== '/' ? 'navigation__item_dark' : ''
  }`;

  return (
    <>
      <BurgerMenu />
      <nav className='navigation navigation-movies'>
        <div className='navgiataion__container'>
          <NavLink className={setActiveLink} to='/movies'>
            Фильмы
          </NavLink>
          <NavLink className={setActiveLink} to='/saved-movies'>
            Сохраненные фильмы
          </NavLink>
        </div>
      </nav>
      <NavLink
        className='navigation__acc-btn navigation__acc-btn_hidden'
        to='/profile'
      >
        Аккаунт
        <div className={navigationItemDark}></div>
      </NavLink>
    </>
  );
};

export default Navigation;
