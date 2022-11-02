// import './MoviesCard.css';
import React, {useState} from 'react';

const MoviesCard = ({ movie }) => {

    let hours = Math.trunc(movie.duration / 60);
    let min = movie.duration - hours * 60;

    const [like, setLike] = useState(false);
    const handleLike = () => setLike(!like);

    const movieLikeClass = `movie__like ${like && 'movie__like_active'}`;

    return (
        <div className='movie'>
            <img className='movie__img' src={movie.image} alt={movie.nameRU}/>
            <div className='movie__info' >
                <div className='movie__block'>
                <h2 className='movie__name'>{movie.nameRU}</h2>
                <div className={movieLikeClass} onClick={handleLike}></div>
                </div>
                <p className='movie__time'>{hours}ч {min}м</p>
            </div>
        </div>
    );
}

export default MoviesCard;