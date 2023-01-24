import './PageNotFound.css';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className='notfound'>
      <div className='notfound__container'>
        <h1 className='notfound__code'>404</h1>
        <p className='notfound__type'>Страница не найдена</p>
      </div>
      {/* <NavLink className='notfound__link' to='/'>
        Назад
      </NavLink> */}
      <button className='notfound__btn' onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
};

export default PageNotFound;
