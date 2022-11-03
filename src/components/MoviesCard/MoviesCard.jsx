import './MoviesCard.css';
import {useLocation} from 'react-router-dom';
import React, {useState} from 'react';

const MoviesCard = ({ movie }) => {

    let hours = Math.trunc(movie.duration / 60);
    let min = movie.duration - hours * 60;

    const [like, setLike] = useState(false);
    const handleLike = () => setLike(!like);

    const location = useLocation();

    const movieLikeClass = location.pathname === '/saved-movies' ? 'movie__delete' : `movie__like ${like && 'movie__like_active'}`;


    return (
        <li className='movie'>
            <img className='movie__img' src={movie.image} alt={movie.nameRU}/>
            <div className='movie__info' >
                <div className='movie__block'>
                <h2 className='movie__name'>{movie.nameRU}</h2>
                <button className={movieLikeClass} onClick={handleLike} type='button'></button>
                </div>
                <p className='movie__time'>{hours}ч {min}м</p>
            </div>
        </li>
    );
}

export default MoviesCard;