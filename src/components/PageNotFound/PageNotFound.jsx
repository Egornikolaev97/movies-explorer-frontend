import './PageNotFound.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className='notfound'>
      <div className='notfound__container'>
        <h1 className='notfound__code'>404</h1>
        <p className='notfound__type'>Страница не найдена</p>
      </div>
      <NavLink className='notfound__link' to='/'>
        Назад
      </NavLink>
    </section>
  );
};

export default PageNotFound;
