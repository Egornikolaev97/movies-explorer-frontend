import './Register.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import React, {useState} from 'react';

const Register = ({handleRegister}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(data);
  };

  return (
    <section className="form-page register">
      <form className="form-page__form register__form" onSubmit={handleSubmit}>
        <Logo />
        <h1 className="form-page__title">Добро пожаловать!</h1>
        <label className="form-page__input-container">
          <span className="form-page__input-text">Имя</span>
          <input
          className="form-page__input"
          name='name'
          type='text'
          />
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">E-mail</span>
          <input
          className="form-page__input"
          name='email'
          type='text'
          onChange={handleChange}
           />
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">Пароль</span>
          <input
          className="form-page__input"
          name="password"
          type="password"
          onChange={handleChange}
           />
        </label>
      </form>
        <button
        className="form-page__btn-submit"
        onClick={handleRegister}
        >Зарегистрироваться
        </button>
        <div className="form-page__subtitle">
          <span className="form-page__text">Уже зарегистрированы?</span>
          <NavLink className="form-page__link" to="/signin">
            Войти
          </NavLink>
        </div>
    </section>
  );
};

export default Register;
