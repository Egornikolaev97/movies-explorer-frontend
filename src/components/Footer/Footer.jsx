import './Footer.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();
    if (location.pathname !== '/' && location.pathname !== '/saved-movies' && location.pathname !== '/movies') {
        return <></>;
    }

    return (
        <footer className='footer'>
            <h3 className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__info'>
                <div className='footer__copyright'>&copy; 2022</div>
                <ul className='footer__list'>
                    <li className='footer__item'>
                        <a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
                    </li>
                    <li className='footer__item'>
                        <a className='footer__link' href='https://github.com/Yandex-Practicum'>GitHub</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;