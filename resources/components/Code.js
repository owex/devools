import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';

const Code = ({ code, language }) => {
  const defaulCopyText = 'Copy';
  const [copyText, setCopyText] = useState(defaulCopyText);
  const timerRef = useRef(null);
  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleCopy = () => {
    setCopyText('Copied!');
    navigator.clipboard.writeText(code);
    timerRef.current = setTimeout(() => setCopyText(defaulCopyText), 1000);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <div className="relative">
        <pre>
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          className="absolute right-0 bottom-0 h-full p-2 text-md dark:text-black"
          onClick={handleCopy}
        >
          {copyText}
        </button>
      </div>
    </>
  );
};

Code.propTypes = {};

export default Code;
