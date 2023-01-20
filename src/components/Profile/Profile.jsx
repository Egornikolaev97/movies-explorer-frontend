import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/currentUserContext';
import useFormValidation from '../../hooks/useFormValidation.js';

const Profile = ({
  handleLogOut,
  handleUpdateUser,
  userMessage,
  isError,
  setIsError,
  errorMessage,
}) => {
  const {
    values,
    setValues,
    errors,
    isValid,
    resetForm,
    handleChange,
    setIsValid,
  } = useFormValidation('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // С помощью переменной проверяем, происходит ли редактирование профиля в данный момент
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    resetForm(currentUser, {}, false);
  }, [currentUser, resetForm]);

  // При загрузке страницы задаем данные текущего пользователя
  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  // Выход из редактировании при нажатии на кнопу "esc"
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        setUpdate(false);
        if (update) {
          resetForm(currentUser);
        }
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  });

  // Сверяем введенные данные в поля формы с данными текущего пользователя
  useEffect(() => {
    setIsError(false);
    return values.name !== currentUser.name ||
      values.email !== currentUser.email
      ? setIsValid(true)
      : setIsValid(false);
  }, [
    values.name,
    values.email,
    currentUser.name,
    currentUser.email,
    setIsValid,
    // setIsError,
  ]);

  // Задаем значение "валидна" или "невалидна" для полей формы,
  // в зависимости от наличия ошибок валидации.
  useEffect(() => {
    return errors.name || errors.email ? setIsValid(false) : setIsValid(true);
  }, [errors.name, errors.email, setIsValid]);

  // Переключения кнопки "сохранить" на "редактировать"
  const handleToggleSubmitButton = () => {
    setIsValid(false);
    setUpdate(!update);
  };

  //функция отправки данных формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      name: values.name,
      email: values.email,
    });
    handleToggleSubmitButton();
  };

  return (
    <section className='form-page profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' noValidate onSubmit={handleUpdateUser}>
        <div
          className={`profile__container ${
            update && 'profile__container_update'
          }`}
        >
          <span className='profile__text'>Имя</span>
          <label className='profile__label profile__label_type_name'>
            <input
              className='profile__input'
              name='name'
              type='text'
              placeholder='Имя'
              required
              minLength='2'
              maxLength='30'
              autoComplete='off'
              pattern='([A-Za-z /-]{2,30})|([А-ЯЁа-яё /-]{2,30})'
              onChange={handleChange}
              value={values.name}
              readOnly={!update}
            />
            <span className='profile__error'>{errors.name}</span>
          </label>
        </div>

        <div className='profile__container profile__container_type_email'>
          <span className='profile__text'>E-mail</span>
          <label className='profile__label profile__label_type_email'>
            <input
              className={`profile__input ${
                isError && !update && 'profile__input_wrong'
              }`}
              name='email'
              type='email'
              autoComplete='off'
              placeholder='Почта'
              required
              maxLength={30}
              onChange={handleChange}
              value={values.email}
              readOnly={!update}
            />
            <span className='profile__error'>{errors.email}</span>
          </label>
        </div>

        <span
          className={
            isError
              ? 'profile__message profile__message_error'
              : 'profile__message_hidden'
          }
        >
          {errorMessage}
        </span>
        <span
          className={
            userMessage ? 'profile__message' : 'profile__message_hidden'
          }
        >
          Данные успешно изменены!
        </span>

        {!update ? (
          <>
            <button
              className='profile__btn'
              type='submit'
              onClick={handleToggleSubmitButton}
            >
              Редактировать
            </button>
            <button
              className='profile__btn'
              type='submit'
              onClick={handleLogOut}
            >
              Выйти из аккаунта
            </button>
          </>
        ) : (
          <button
            className={`
        form-page__btn-submit form-page__btn-submit_save
        ${!isValid ? 'form-page__btn-submit_disabled' : ''}
        `}
            type='submit'
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Сохранить
          </button>
        )}
      </form>
    </section>
  );
};

export default Profile;
