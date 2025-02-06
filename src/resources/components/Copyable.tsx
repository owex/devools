import React, { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  defaulCopyText?: string;
};

const Copyable = ({ text, defaulCopyText = 'Copy' }: Props) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [content, setContent] = useState<string>('');
  const [copyText, setCopyText] = useState<string>(defaulCopyText);

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
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

export default Copyable;
