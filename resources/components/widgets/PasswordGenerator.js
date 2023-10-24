import { PasswordMeter } from 'password-meter';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Switch from '@/components/Switch';
import WidgetLayout from '@/components/widgets/WidgetLayout';

const PasswordGenerator = ({
  title = 'Password Generator',
  titleAsHeading = '',
  text,
}) => {
  const charsets = {
    numbers: {
      text: 'Numbers',
      set: '0123456789',
    },
    lowercase: {
      text: 'Letters Lowercase',
      set: 'abcdefghijklmnopqrstuvwxyz',
    },
    caps: {
      text: 'Letters Uppercase',
      set: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    special: {
      text: 'ASCII symbols',
      set: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
    },
  };

  const [charset, setCharset] = useState([
    'numbers',
    'lowercase',
    'caps',
    'special',
  ]);
  const [password, setPassword] = useState();
  const [length, setLength] = useState(15);
  const [list, setList] = useState([]);
  const [saveToList, setSaveToList] = useState(false);

  const getCharacter = () => {
    const currentCharset = charset
      .map((item) => {
        return charsets[item].set;
      })
      .join('');
    return currentCharset.charAt(
      Math.floor(Math.random() * currentCharset.length)
    );
  };

  const createPassword = () => {
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword = newPassword + getCharacter();
    }

    return newPassword;
  };

  const generatePassword = (copy) => {
    const newPassword = createPassword();
    setPassword(newPassword);
    if (saveToList) {
      setList([...list, newPassword]);
    }
    // Copy to clipboard
    if (copy) {
      navigator.clipboard.writeText(newPassword);
    }
  };

  const updateCharset = (charsetKey) => {
    const includesCharset = charset.includes(charsetKey);
    if (includesCharset) {
      setCharset([
        ...charset.filter((item) => {
          return item !== charsetKey;
        }),
      ]);
    }

    if (!includesCharset) {
      setCharset([...charset, charsetKey]);
    }
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const savedPasswords = useMemo(() => {
    return [
      ...list
        .slice()
        .reverse()
        .filter((i) => i !== ''),
    ];
  }, [list]);

  const SavedPasswordItem = ({ text, onRemove }) => {
    const [passwordText, setPasswordText] = useState('');
    const [copyText, setCopyText] = useState('Copy');
    const timerRef = useRef(null);

    const handleCopy = () => {
      setCopyText('Copied!');
      navigator.clipboard.writeText(passwordText);
      timerRef.current = setTimeout(() => setCopyText('Copy'), 1000);
    };

    useEffect(() => {
      // Clear the interval when the component unmounts
      return () => clearTimeout(timerRef.current);
    }, []);

    useEffect(() => {
      setPasswordText(text);
    }, [text]);

    const getFriendlyScore = (val) => {
      const values = {
        veryWeak: 'Very Weak',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        veryStrong: 'Very Strong',
        perfect: 'Perfect',
      };

      return values[val] || 'Unknown';
    };

    const score = useMemo(() => {
      const { status } = new PasswordMeter().getResult(passwordText);

      return status;
    }, [passwordText]);

    return (
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center w-full py-5 border-b border-gray-300 text-sm font-semibold text-gray-800"
          onClick={handleCopy}
        >
          <div
            className={classNames('p-1 text-xs text-white rounded-md', {
              'bg-purple-600': score === 'veryWeak',
              'bg-red-600': score === 'weak',
              'bg-orange-600': score === 'medium',
              'bg-yellow-600': score === 'strong',
              'bg-green-300': score === 'veryStrong',
              'bg-green-600': score === 'perfect',
            })}
          >
            {getFriendlyScore(score)}
          </div>
          <div className="mx-auto">{passwordText}</div>
          <div>{copyText}</div>
        </button>
        {onRemove && (
          <div>
            <Button onClick={onRemove}>&times;</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <WidgetLayout title={title} titleAsHeading={titleAsHeading} text={text}>
      <div className="flex flex-col gap-y-2 mb-2">
        <SavedPasswordItem text={password} />
        <div className="flex flex-wrap space-4">
          {Object.keys(charsets).map((charsetKey) => {
            const item = charsets[charsetKey];
            const isActive = charset.includes(charsetKey);
            return (
              <div className="w-full lg:w-1/2 p-2" key={`charset${charsetKey}`}>
                <button
                  key={`charset${charsetKey}`}
                  className={classNames(
                    'w-full p-2 bg-gray-300 text-black rounded-lg',
                    {
                      'opacity-40': !isActive,
                    }
                  )}
                  onClick={() => updateCharset(charsetKey)}
                >
                  <div className="font-bold">{item.text}</div>
                  <div className="text-xs">{item.set}</div>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-5">
            <label className="text-xs">
              <div className="mb-1">Length</div>
              <Input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </label>
            <div>
              <div className="text-xs mb-1">Save</div>
              <Switch
                enabled={saveToList}
                onChange={(val) => setSaveToList(val)}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {list && list.length > 1 && (
              <Button onClick={() => setList([])} theme="warning">
                Clear
              </Button>
            )}
            <Button onClick={generatePassword}>Generate</Button>
            <Button onClick={() => generatePassword(true)}>
              Generate &amp; Copy
            </Button>
          </div>
        </div>
        <ul role="list">
          {savedPasswords &&
            savedPasswords.map((listItem) => (
              <li key={`listItem${listItem}`}>
                <SavedPasswordItem
                  text={listItem}
                  onRemove={() =>
                    setList([...list.filter((i) => i !== listItem)])
                  }
                />
              </li>
            ))}
        </ul>
      </div>
    </WidgetLayout>
  );
};

PasswordGenerator.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default PasswordGenerator;
