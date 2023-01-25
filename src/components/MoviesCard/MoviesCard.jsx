import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import React from 'react';

function MoviesCard({
  movie,
  handleDeleteMovie,
  handleSaveMovie,
  savedMovies,
  savedMoviesList,
}) {
  const { image, nameRU, duration } = movie;

  let hours = Math.trunc(duration / 60);
  let min = duration - hours * 60;

  const location = useLocation();
  const savedMoviePath = location.pathname === '/saved-movies';
  const imageUrl = `https://api.nomoreparties.co/${image.url}`;

  const isSaved = savedMovies.some((item) => item.movieId === movie.id);
  const isSavedList = savedMoviesList.some((m) => m.movieId === movie.id);
  const savedItem = savedMovies.filter((m) => m.movieId === movie.id)[0];

  //отображение кнопки лайк
  const likeButton = isSaved || isSavedList ? 'movie__like movie__like_active' : 'movie__like';
  const deleteButton = 'movie__delete';
  const buttonClass = savedMoviePath ? deleteButton : likeButton;

  const handleMovieClick = () => {
    if (isSaved) {
      handleDeleteMovie(savedItem);
    } else {
      handleSaveMovie(movie);
    }
  };

  const onDelete = () => handleDeleteMovie(movie);

  return (
    <li className='movie'>
      <a
        href={movie.trailerLink}
        className='movie__trailerlink'
        target='_blank'
        rel='noreferrer'
      >
      <img
        className='movie__img'
        src={savedMoviePath ? movie.image : imageUrl}
        alt={nameRU}/>
      </a>
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
