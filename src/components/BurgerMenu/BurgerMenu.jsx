import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const setBurgerActiveLink = ({ isActive }) => (isActive ? 'burger__link-active' : 'burger__link');

  return (
    <>
      <nav className={`burger__nav ${isMenuOpen && 'burger__nav_opened'}`}>
        <ul className="burger__nav-container">
          <li className="burger__list" onClick={closeMenu}>
            <NavLink className={setBurgerActiveLink} end to="/">
              Главная
            </NavLink>
          </li>
          <li className="burger__list" onClick={closeMenu}>
            <NavLink className={setBurgerActiveLink} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="burger__list" onClick={closeMenu}>
            <NavLink className={setBurgerActiveLink} to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink className="navigation__acc-btn" to="/profile" onClick={closeMenu}>
          Аккаунт
          <div className="navigation__item navigation__item_dark"></div>
        </NavLink>
      </nav>
      <div className={`burger__background ${isMenuOpen ? 'burger__background_active' : ''}`} onClick={closeMenu}></div>
      <button className={`burger__btn ${isMenuOpen && 'burger__btn_close'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} type='button'></button>
    </>
  );
};

export default BurgerMenu;
