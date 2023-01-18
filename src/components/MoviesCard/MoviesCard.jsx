import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function MoviesCard({
  movie,
  handleDeleteMovie,
  handleSaveMovie,
  savedMovies,
}) {
  const { image, nameRU, duration } = movie;

  let hours = Math.trunc(duration / 60);
  let min = duration - hours * 60;
  const [like, setLike] = useState(false);

  const location = useLocation();
  const savedMoviePath = location.pathname === '/saved-movies';
  const imageUrl = `https://api.nomoreparties.co/${image.url}`;

  const isSaved = savedMovies.some((item) => item.movieId === movie.id);
  const savedItem = savedMovies.filter((m) => m.movieId === movie.id)[0];

  //отображение кнопки лайк
  const likeButton = isSaved ? 'movie__like movie__like_active' : 'movie__like';
  const deleteButton = 'movie__delete';
  const buttonClass = savedMoviePath ? deleteButton : likeButton;

  const handleMovieClick = () => {
    if (isSaved) {
      handleDeleteMovie(savedItem);
      setLike(false);
      console.log('deleted');
    } else {
      handleSaveMovie(movie);
      setLike(true);
      console.log('saved');
    }
  };

  const onDelete = () => handleDeleteMovie(movie);

  return (
    <li className='movie'>
      <img
        className='movie__img'
        src={savedMoviePath ? movie.image : imageUrl}
        alt={nameRU}
      />
      <div className='movie__info'>
        <div className='movie__block'>
          <h2 className='movie__name'>{nameRU}</h2>
          <button
            className={buttonClass}
            onClick={savedMoviePath ? onDelete : handleMovieClick}
            type='button'
          ></button>
        </div>
        <p className='movie__time'>
          {hours > 0 ? hours + 'ч' : null} {min + 'м'}
        </p>
      </div>
    </li>
  );
}
export default MoviesCard;
