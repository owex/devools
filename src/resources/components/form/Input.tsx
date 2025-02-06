import { useEffect, useState } from 'react';

type Props = {
  disabled?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value?: string | number;
};

const Input = ({
  name = '',
  onChange,
  value = '',
  disabled = false,
  ...props
}: Props) => {
  const [inputValue, setInputValue] = useState<string | number>(value);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange && typeof onChange === 'function') {
      onChange(event);
    }
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
