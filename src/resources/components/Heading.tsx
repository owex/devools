import React from 'react';
import PropTypes from 'prop-types';

type HeadingProps = {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
};

const Heading = ({ children, level }: HeadingProps) => {

  const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const safeHeading = level && validHeadingLevels.includes(level) ? level : 'p';


  return React.createElement(
    safeHeading,
    { className: "mb-3 text-primary dark:text-white text-xl font-semibold font-heading" },
    children
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
};

export default Heading;
