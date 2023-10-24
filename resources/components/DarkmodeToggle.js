import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocalStorage } from 'resources/hooks/localstorage';

const DarkmodeToggle = (props) => {
  const [darkMode, setDarkmode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      className={classNames('w-5 mx-5', {
        'text-white': darkMode,
        'text-black': !darkMode,
      })}
      onClick={() => setDarkmode(!darkMode)}
    >
      <span className="sr-only">Toggle Dark</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12zm2 0C2 6.486 6.486 2 12 2v20C6.486 22 2 17.514 2 12z" />
      </svg>
    </button>
  );
};

DarkmodeToggle.propTypes = {};

export default DarkmodeToggle;
