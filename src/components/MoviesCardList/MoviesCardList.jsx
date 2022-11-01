import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../configs/constants'

const MoviesCardList = () => {
  return (
    <section className="movies">
      <div className="movies__container">
        <div className="movies__list">
            {movies.map((movie) => (
                <MoviesCard key={movie._id} movie={movie} />
            ))}
        </div>
        <button className='movies__btn'>Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;
