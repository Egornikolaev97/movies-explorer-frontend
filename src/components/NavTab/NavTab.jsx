import './NavTab.css';

const NavTab = () => {
    return (
        <nav className='navtab'>
            <ul className='navtab__container'>
                <li className='navtab__item'>
                    <a className='navtab__link' href='#about'>О проекте</a>
                </li>
                <li className='navtab__item'>
                    <a className='navtab__link' href='#techs'>Технологии</a>
                </li>
                <li className='navtab__item'>
                    <a className='navtab__link' href='#about-me'>Студент</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavTab;
