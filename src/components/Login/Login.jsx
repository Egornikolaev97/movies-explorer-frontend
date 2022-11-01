import './Login.css';
import Logo from '../Logo/Logo';
import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';

  const Login = ({handleLogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(data);
  };

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
          type='text'
          onChange={handleChange}
          value={data.email}
           />
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">Пароль</span>
          <input
          className="form-page__input"
          name="password"
          type="password"
          onChange={handleChange}
          value={data.password}
           />
        </label>
      </form>
      <button
      className="form-page__btn-submit"
      onClick={handleLogin}>
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
