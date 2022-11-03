import './Profile.css';

const Profile = ({handleLogOut}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogOut();
  };

  return (
    <section className="form-page profile">
      <h1 className="profile__title">Привет, Егор!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__input-container">
            <span className="profile__text">Имя</span>
          <input
          className="profile__input"
          name="name"
          type="text"
          autoComplete="off"
          />
        </label>
        <label className="profile__input-container">
        <span className="profile__text">E-mail</span>
          <input
          className="profile__input"
          name="email"
          type="email"
          autoComplete="off"
          />
        </label>
      </form>
      <button className="profile__btn" type='submit'>Редактировать</button>
      <button className="profile__btn" onClick={handleLogOut} type='submit'>Выйти из аккаунта</button>
    </section>
  );
};

export default Profile;
