import './Register.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import React, {useState} from 'react';

const Register = ({ handleRegister }) => {

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [data, setData] = useState({ name: '', email: '', password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { name, email, password } = data
    e.preventDefault();
    handleRegister({name, email, password});
  }

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
          type='name'
          onChange={handleChange}
          value={data.name}
          required
          />
        </label>
        <label className="form-page__input-container">
          <span className="form-page__input-text">E-mail</span>
          <input
          className="form-page__input"
          name='email'
          type='email'
          onChange={handleChange}
          value={data.email}
          required
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
          required
           />
        </label>
      </form>
        <button
        type='submit'
        className="form-page__btn-submit"
        onClick={handleSubmit}
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
