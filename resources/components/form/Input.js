import { useEffect, useState } from 'react';

const Input = ({
  name = '',
  onChange,
  value = '',
  disabled = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      type="text"
      name={name}
      value={inputValue}
      disabled={disabled}
      onChange={changeHandler}
      className="block w-full px-3 py-2 sm:text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-m shadow-sm"
      {...props}
    />
  );
};

export default Input;
