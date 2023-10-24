import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Copyable = ({ text, defaulCopyText = 'Copy' }) => {
  const timerRef = useRef(null);
  const [content, setContent] = useState('');
  const [copyText, setCopyText] = useState(defaulCopyText);

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    setContent(text);
  }, [text]);

  const handleCopy = () => {
    setCopyText('Copied!');
    navigator.clipboard.writeText(content);
    timerRef.current = setTimeout(() => setCopyText(defaulCopyText), 1000);
  };

  return (
    <button
      className="flex items-center w-full py-5 px-4 bg-gray-300 border-b border-gray-300 text-sm font-semibold text-gray-800"
      onClick={handleCopy}
    >
      <div className="mx-auto">{content}</div>
      <div>{copyText}</div>
    </button>
  );
};

Copyable.propTypes = {};

export default Copyable;
