import {useCallback, useState} from 'react';
import isEmail from 'validator/es/lib/isEmail';

//хук управления формой и валидации формы
const useFormValidation = () => {
  const [values, setValues] = useState({ name: '', email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    if (name === 'email' && !isEmail(value)) {
      setErrors({ ...errors, email: 'Некорректный формат почты' });
    }
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = { name: '', email: '', password: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, setIsValid, resetForm };
}

export default useFormValidation;