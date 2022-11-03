import './AboutMe.css';
import photo from '../../images/photo.png';

const AboutMe = () => {
  return (
    <section className="about-me" id='about-me'>
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <div className="about-me__text-container">
          <h3 className="about-me__name">Егор</h3>
          <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/Egornikolaev97">
            Github
          </a>
        </div>
        <img src={photo} alt="Моя фотография" className="about-me__img" />
      </div>
    </section>
  );
};

export default AboutMe;
