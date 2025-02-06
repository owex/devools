import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';

type Props = {
  code: string;
  language: string;
}

const Code = ({ code, language }: Props) => {
  const defaulCopyText = 'Copy';
  const [copyText, setCopyText] = useState<string>(defaulCopyText);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  /**
   * Handles copying a code snippet to the clipboard, and resets the copyText state back to 'Copy' after a 1 second delay.
   * 
   * @remarks
   * This function is safe to call repeatedly, as it first clears any existing timeout before setting a new one.
   * This prevents the copy text from rapidly flashing between "Copy" and "Copied!" if the user rapidly clicks the copy button.
   */
  const handleCopy = (): void => {
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

Code.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Code;
