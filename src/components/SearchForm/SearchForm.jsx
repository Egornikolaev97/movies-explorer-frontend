import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import search from '../../images/search.svg'

const SearchForm = () => {
  return (
    <section className='search content-page'>
      <div className='search__container'>
        <form className='search__form' action='search'>
          <div className='search__item'>
            <img className='search__icon' src={search} alt='поиск' />
          </div>
          <input
          className='search__input'
          placeholder='Фильм'
          type='text'
          required
          />
          <button className='search__btn' type='submit'>
            <img className='search__icon' src={search} alt='поиск' />
          </button>
        </form>
        <FilterCheckBox />
      </div>
    </section>
  );
};

export default SearchForm;
