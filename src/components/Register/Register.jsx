import './Register.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidation.js';

const Register = ({ handleRegister, errorMessage, isError, setIsError }) => {
  const { values, errors, isValid, resetForm, handleChange, setIsValid } =
    useFormValidation();

  // Очистка полей формы и удаление сообщение об
  // ошибки при переходе на страницу "регистрация"
  useEffect(() => {
    resetForm(
      {
        name: '',
        email: '',
        password: '',
      },
      {},
      false
    );
    setIsError(false);
  }, [setIsError, resetForm]);

  //функция отправки данных формы
  const handleSubmit = (e) => {
    const { name, email, password } = values;
    e.preventDefault();
    handleRegister({ name, email, password });
    setIsValid(false);
  };

  return (
    <section className='form-page register'>
      <form className='form-page__form register__form' onSubmit={handleSubmit}>
        <Logo />
        <h1 className='form-page__title'>Добро пожаловать!</h1>
        <label className='form-page__input-container'>
          <span className='form-page__input-text'>Имя</span>
          <input
            className='form-page__input'
            name='name'
            type='text'
            onChange={handleChange}
            value={values.name}
            minLength={2}
            maxLength={30}
            autoComplete='off'
            pattern='([A-Za-z /-]{2,30})|([А-ЯЁа-яё /-]{2,30})'
            required
          />
          <span className='form__error'>{errors.name}</span>
        </label>
        <label className='form-page__input-container'>
          <span className='form-page__input-text'>E-mail</span>
          <input
            className='form-page__input'
            name='email'
            type='email'
            maxLength={30}
            onChange={handleChange}
            value={values.email}
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,30}$'
            required
          />
          <span className='form__error'>{errors.email}</span>
        </label>
        <label className='form-page__input-container'>
          <span className='form-page__input-text'>Пароль</span>
          <input
            className='form-page__input'
            name='password'
            type='password'
            minLength={4}
            maxLength={30}
            onChange={handleChange}
            value={values.password}
            required
          />
          <span className='form__error'>{errors.password}</span>
        </label>
      </form>

      <span
        className={
          isError
            ? 'profile__message profile__message_error'
            : 'profile__message_hidden'
        }
      >
        {errorMessage}
      </span>

      <button
        type='submit'
        className={`form-page__btn-submit ${
          !isValid ? 'form-page__btn-submit_disabled' : ''
        }`}
        onClick={handleSubmit}
      >
        Зарегистрироваться
      </button>
      <div className='form-page__subtitle'>
        <span className='form-page__text'>Уже зарегистрированы?</span>
        <NavLink className='form-page__link' to='/signin'>
          Войти
        </NavLink>
      </div>
    </section>
  );
};

export default Register;
