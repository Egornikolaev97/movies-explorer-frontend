import './AboutMe.css';
import photo from '../../images/photo.png';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__profile'>
        <div className='about-me__text-container'>
          <h3 className='about-me__name'>Егор</h3>
          <p className='about-me__info'>Фронтенд-разработчик, 25 лет</p>
          <p className='about-me__description'>
            Я родился в маленьком городе в Челябинской области, после школы переехал
            Санкт-Петербург, где окончил строительный факультет в СПбГАСУ. На
            последнем курсе университета увлекся программированием, что привело
            меня в веб-разработку. Сейчас нахожусь в поисках работы, качаю
            скиллы, пишу пет-проекты. Моя главная цель на ближайшие годы -
            работать над крутым сервисом, которым будут пользоваться миллионы
            людей по всему миру!
          </p>
          <a
            className='about-me__link'
            href='https://github.com/Egornikolaev97'
          >
            Github
          </a>
        </div>
        <img src={photo} alt='Моя фотография' className='about-me__img' />
      </div>
    </section>
  );
};

export default AboutMe;
