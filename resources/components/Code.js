import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Prism from 'prismjs';


const Code = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

Code.propTypes = {}

export default Code
