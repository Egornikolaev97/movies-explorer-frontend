import './Login.css';
import Logo from '../Logo/Logo';
import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';

  const Login = ({ handleLogin }) => {
    const [data, setData] = useState({email: '', password: ''})

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((userData) => ({
        ...userData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      const {email, password } = data
      e.preventDefault();
      handleLogin({email, password})
    }

  return (
    <section className="form-page login">
      <form className="form-page__form login__form" onSubmit={handleSubmit}>
        <Logo />
        <h1 className="form-page__title">Рады видеть!</h1>
        <label className="form-page__input-container">
          <span className="form-page__input-text">E-mail</span>
          <input
          className="form-page__input"
          name='email'
          type='email'
          value={data.email}
          onChange={handleChange}
          required
           />
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">Пароль</span>
          <input
          className="form-page__input"
          name='password'
          type='password'
          value={data.password}
          onChange={handleChange}
          required
           />
        </label>
      </form>
      <button
      className="form-page__btn-submit"
      onClick={handleSubmit}
      type='button'
      >
        Войти
        </button>
      <div className='form-page__subtitle'>
        <span className="form-page__text">Ещё не зарегистрированы?</span>
        <NavLink className="form-page__link" to="/signup">
            Регистрация
        </NavLink>
      </div>
    </section>
  );
};

export default Login;
