import './Login.css';
import Logo from '../Logo/Logo';
import {NavLink} from 'react-router-dom';
import React, {useEffect} from 'react';
import useFormValidation from '../../hooks/useFormValidation.js';

  const Login = ({ handleLogin, errorMessage, isError }) => {
    const {values, errors, isValid, resetForm, handleChange, setIsValid } = useFormValidation();

    // Очистка полей формы
    useEffect(() => {
      resetForm({
          email: "",
          password: "",
        },
        {},
        false
      );
    }, [resetForm]);

    // Отправка данных формы
    const handleSubmit = (e) => {
      const {email, password } = values
      e.preventDefault();
      handleLogin({email, password});
      setIsValid(false);
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
          value={values.email}
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,30}$"
          minLength={2}
          maxLength={30}
          required
           />
           <span className='form__error'>{errors.email}</span>
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">Пароль</span>
          <input
          className="form-page__input"
          name='password'
          type='password'
          value={values.password}
          onChange={handleChange}
          minLength={4}
          maxLength={30}
          required
           />
           <span className='form__error'>{errors.password}</span>
        </label>
      </form>

      <span className={isError ? 'profile__message profile__message_error': 'profile__message_hidden'}>
        {errorMessage}
      </span>

      <button
      className={`form-page__btn-submit ${!isValid ? 'form-page__btn-submit_disabled' : ''}`}
      onClick={handleSubmit}
      type='submit'
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
