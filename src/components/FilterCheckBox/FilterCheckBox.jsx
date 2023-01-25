import './FilterCheckBox.css';

const FilterCheckBox = () => {
  return (
    <div className="checkbox">
      <input type="checkbox" id="checkbox" className="checkbox__input" />
      <label htmlFor="checkbox" className="checkbox__label">
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckBox;
