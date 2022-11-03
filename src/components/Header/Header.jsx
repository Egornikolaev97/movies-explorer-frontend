import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import { useLocation } from 'react-router-dom';

const Header = ({loggedIn}) => {

  const location = useLocation();

  if (
    location.pathname !== '/' &&
    location.pathname !== '/saved-movies' &&
    location.pathname !== '/movies' &&
    location.pathname !== '/profile') {
      return <></>;
  }

  return (
    <header className={`header ${location.pathname !== '/' ? "header_dark" : ""}`}>
      <div className="header__container">
        <Logo />
        <Navigation loggedIn={loggedIn}/>
      </div>
    </header>
  );
};

export default Header;
