import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useState, useCallback, useEffect } from 'react';

import { WidgetType } from '@/resources/types/widget.type';
import Button from '@/resources/components/Button';
import Input from '@/resources/components/form/Input';
import Switch from '@/resources/components/Switch';
import WidgetLayout from '@/resources/components/widgets/WidgetLayout';
import SavedPasswordItem from './SavedPasswordItem';

const charsets: { [key: string]: { text: string; set: string } } = {
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

const PasswordGenerator = ({
  title = 'Password Generator',
  titleAsHeading,
  text,
}: WidgetType) => {

  const [charset, setCharset] = useState<string[]>([
    'numbers',
    'lowercase',
    'caps',
    'special',
  ]);
  const [password, setPassword] = useState<string>();
  const [length, setLength] = useState<number>(15);
  const [list, setList] = useState<string[]>([]);
  const [saveToList, setSaveToList] = useState<boolean>(false);

  /**
   * Creates a new password with a length of {length} characters,
   * using only characters from the currently selected character sets.
   *
   * @returns A string containing the new password.
   */
  const createPassword = useCallback((): string => {
    /**
    * Gets a random character from the currently selected character sets.
    *
    * @returns A single character string.
    */
    const getCharacter = (): string => {
      const currentCharset = charset
        .map((item: string) => {
          return charsets[item].set;
        })
        .join('');
      return currentCharset.charAt(
        Math.floor(Math.random() * currentCharset.length)
      );
    };

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword = newPassword + getCharacter();
    }

    return newPassword;
  }, [charset, length]);

  /**
   * Generates a new password based on the current settings, and updates the
   * current password state. If the copy parameter is true, the new password
   * is also copied to the clipboard. If the saveToList state is true, the
   * new password is also added to the list of saved passwords.
   *
   * @param {boolean} copy - Whether to copy the new password to the clipboard.
   */
  const generatePassword = (copy?: boolean): void => {
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

  /**
   * Updates the current character set by adding or removing a specified charset key.
   * 
   * @param {string} charsetKey - The key of the character set to add or remove.
   * If the character set is already included, it will be removed; otherwise, it will be added.
   */

  const updateCharset = (charsetKey: string) => {
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
    const initalPassword = createPassword();
    setPassword(initalPassword);
  }, [createPassword]);

  const savedPasswords = useMemo<string[]>(() => {
    return [
      ...list
        .slice()
        .reverse()
        .filter((i) => i !== ''),
    ];
  }, [list]);

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
                onChange={(e) => setLength(Number(e.target.value))}
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
  titleAsHeading: PropTypes.string,
  text: PropTypes.string,
};

export default PasswordGenerator;
