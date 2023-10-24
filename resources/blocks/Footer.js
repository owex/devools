import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => {
  return (
    <footer className="lg:flex items-center p-4 bg-gray-100 shadow-sm justify-center w-full">
      <div className="lg:mx-8">
        <p>
          A project by <a href="https://www.linkedin.com/in/owen-rhodes" target="_blank" rel="nofollow" className="text-red-500 underline">Owen Rhodes</a>
        </p>
      </div>
    </footer>
  )
};

Footer.propTypes = {};

export default Footer;
