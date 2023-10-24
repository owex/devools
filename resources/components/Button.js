import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({active, children, theme = 'primary', ...props}) => {
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    setIsActive(active);
  }, [active])

  return (
    <button {...props} className={classNames('inline-block px-3 py-2 text-xs font-medium leading-6 text-center transition border-solid border-2 focus:outline-none', {
        'border-primary': theme === 'primary',
        'bg-primary text-white': isActive && theme === 'primary',
        'text-primary hover:bg-primary hover:text-white': !isActive && theme === 'primary',
        'border-orange-500': theme === 'warning',
        'bg-orange-500 text-white': isActive && theme === 'warning',
        'text-orange-500 hover:bg-orange-500 hover:text-white': !isActive && theme === 'warning',
    })}>
    {children}
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  theme: PropTypes.oneOf([
    'primary',
    'warning',
  ]),
}

export default Button;
