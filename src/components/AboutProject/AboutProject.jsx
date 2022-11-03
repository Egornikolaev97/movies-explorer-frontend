import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className='about' id='about'>
            <h2 className='about__title'>О проекте</h2>
            <div className='about__container'>
            <div className='about__paragraph'>
                <h3 className='about__paragraph-title'>Дипломный проект включал 5 этапов</h3>
                <p className='about__paragraph-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='about__paragraph'>
                <h3 className='about__paragraph-title'>На выполнение диплома ушло 5 недель</h3>
                <p className='about__paragraph-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            </div>
            <div className='about__bar'>
                <div className='about__bar-backend'>
                    <p className='about__bar-text-back'>1 неделя</p>
                    <p className='about__bar-span'>Back-end</p>
                </div>
                <div className='about__bar-frontend'>
                    <p className='about__bar-text-front'>4 недели</p>
                    <p className='about__bar-span'>Front-end</p>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;