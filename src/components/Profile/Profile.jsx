import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../context/currentUserContext';

const Profile = ({ handleLogOut, handleUpdateUser, update, handleToggleSubmitButton }) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({ name: '', email: '' });
  const setReadOnly = update ? false : true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { name, email } = currentUser;
    setData({
      name: name,
      email: email,
    });
  }, [currentUser, setData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      name: data.name,
      email: data.email
    });
    handleToggleSubmitButton();
  };

  return (
    <section className="form-page profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__input-container">
          <span className="profile__text">Имя</span>
          <input
          className="profile__input"
          name="name" type="text"
          autoComplete="off"
          onChange={handleChange}
          value={data.name}
          readOnly={setReadOnly}
          />
        </label>
        <label className="profile__input-container">
          <span className="profile__text">E-mail</span>
          <input
          className="profile__input"
          name="email" type="email"
          autoComplete="off"
          onChange={handleChange}
          value={data.email}
          readOnly={setReadOnly}
          />
        </label>
      </form>

      {!update ? (
        <>
          <button className="profile__btn" type="submit" onClick={handleToggleSubmitButton}>
            Редактировать
          </button>
          <button className="profile__btn" type="submit" onClick={handleLogOut}>
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <button className="form-page__btn-submit form-page__btn-submit_save" type='submit' onClick={handleSubmit}>Сохранить</button>
      )}

    </section>
  );
};

export default Profile;
