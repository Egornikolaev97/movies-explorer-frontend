import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__item">
          <a className="techs__link" href="https://html.com/">
            HTML
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://developer.mozilla.org/en-US/docs/Web/CSS">
            CSS
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://developer.mozilla.org/ru/docs/Web/JavaScript">
            JS
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://reactjs.org/">
            React
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://git-scm.com/">
            Git
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://expressjs.com/">
            Express.js
          </a>
        </li>
        <li className="techs__item">
          <a className="techs__link" href="https://mongodb.com/">
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Techs;
