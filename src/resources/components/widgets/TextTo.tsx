import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import slugify from 'slugify';

import Button from '@/resources/components/Button';
import Input from '@/resources/components/form/Input';
import WidgetLayout from '@/resources/components/widgets/WidgetLayout';
import { WidgetType } from '@/resources/types/widget.type';

const TextTo = ({
  title = 'Text Formatter',
  titleAsHeading,
  text = 'Convert text to a URL slug or Kebab/Snake/Camel case and more!',
}: WidgetType) => {
  const [mode, setMode] = useState<string>('slugify');
  const [input, setInput] = useState<string>('');
  const placeholderText = 'Hello World';

  /**
   * Converts a string to sentence case.
   * 
   * @param {string} inputString The text to be converted.
   * @returns {string} The modified text in sentence case.
   */
  const toSentenceCase = (inputString: string): string => {
    // Split the input string into sentences using periods as the delimiter.
    const sentences = inputString.split('. ');

    // Initialize an empty array to store the modified sentences.
    const modifiedSentences = [];

    for (const sentence of sentences) {
      // Capitalize the first letter of each sentence and convert the rest to lowercase.
      const modifiedSentence =
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      modifiedSentences.push(modifiedSentence);
    }

    // Join the modified sentences back together with periods.
    const result = modifiedSentences.join('. ');

    return result;
  }

  /**
   * Converts a given string to camelCase.
   * 
   * @param {string} string - The input string to be converted.
   * @returns {string} - The converted string in camelCase format.
   */

  const camelCaseWords = (string: string): string => {
    return [...string.trim().toLowerCase().split(' ')]
      .map((str, index) => {
        if (index === 0) {
          return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
        }

        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
      })
      .join(' ');
  };

  /**
   * Converts a given string to PascalCase.
   *
   * @param {string} string - The input string to be converted.
   * @returns {string} - The converted string in PascalCase format.
   */

  const pascalCaseWords = (string: string): string => {
    return [...string.trim().toLowerCase().split(' ')]
      .map((str) => {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
      })
      .join(' ');
  };

  /**
   * Applies a given transformation to a given string.
   * 
   * @param {string} string - The input string to be converted.
   * @param {string} mode - The transformation mode to apply. Valid modes are:
   *  - slugify
   *  - camelcase
   *  - pascalcase
   *  - camelsnakecase
   *  - snakecase
   *  - screamingsnakecase
   *  - kebabcase
   *  - flatcase
   *  - upperflatcase
   *  - pascalsnakecase
   *  - traincase
   *  - cobolcase
   *  - sentencecase
   * @returns {string} - The converted string in the requested format.
   */
  const formatString = useCallback((string: string, mode: string) => {
    const transformations: Record<string, (str: string) => string> = {
      slugify: (str) => slugify(str, { replacement: '-', lower: true }),
      camelcase: (str) => camelCaseWords(str).replace(/\s/g, ''),
      pascalcase: (str) => pascalCaseWords(str).replace(/\s/g, ''),
      camelsnakecase: (str) => camelCaseWords(str).replace(/\s/g, '_'),
      snakecase: (str) => str.toLowerCase().replace(/\s/g, '_'),
      screamingsnakecase: (str) => str.toUpperCase().replace(/\s/g, '_'),
      kebabcase: (str) => str.replace(/\s/g, '-'),
      flatcase: (str) => str.toLowerCase().replace(/\s/g, ''),
      upperflatcase: (str) => str.toUpperCase().replace(/\s/g, ''),
      pascalsnakecase: (str) => pascalCaseWords(str).replace(/\s/g, '_'),
      traincase: (str) => pascalCaseWords(str).replace(/\s/g, '-'),
      cobolcase: (str) => pascalCaseWords(str).replace(/\s/g, '-').toUpperCase(),
      sentencecase: (str) => toSentenceCase(str),
    };

    return transformations[mode]?.(string) ?? string;
  }, []);

  const output = useMemo<string>(() => {
    return formatString(input, mode);
  }, [input, mode, formatString]);

  const outputPlaceholder = useMemo<string>(() => {
    return formatString('Hello World', mode);
  }, [mode, formatString]);

  return (
    <div>
      <WidgetLayout
        title={title}
        titleAsHeading={titleAsHeading}
        text={text}
        page="/tools/text-formatter"
      >
        <div className="flex flex-col gap-y-2 mb-2">
          <Input
            name="input"
            value={input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
            placeholder={placeholderText}
          />
          <div
            className={classNames('transition-opacity', {
              'opacity-40': !output,
              'opacity-1': output,
            })}
          >
            <Input value={output} disabled placeholder={outputPlaceholder} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            {
              text: 'PascalCase',
              mode: 'pascalcase',
            },
            {
              text: 'camelCase',
              mode: 'camelcase',
            },
            {
              text: 'kebab-case',
              mode: 'slugify',
            },
            {
              text: 'Snake_Case',
              mode: 'snakecase',
            },
            {
              text: 'flatcase',
              mode: 'flatcase',
            },
            {
              text: 'UPPERFLATCASE',
              mode: 'upperflatcase',
            },
            {
              text: 'Pascal_Snake_Case',
              mode: 'pascalsnakecase',
            },
            {
              text: 'camel_Snake_Case',
              mode: 'camelsnakecase',
            },
            {
              text: 'SCREAMING_SNAKE_CASE',
              mode: 'screamingsnakecase',
            },
            {
              text: 'Train-Case',
              mode: 'traincase',
            },
            {
              text: 'COBOL-CASE',
              mode: 'cobolcase',
            },
            {
              text: 'Sentence Case',
              mode: 'sentencecase',
            },
          ].map((option) => (
            <Button
              key={`textto${option.mode}`}
              onClick={() => setMode(option.mode)}
              active={mode === option.mode}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </WidgetLayout>
    </div>
  );
};

TextTo.propTypes = {
  title: PropTypes.string,
  titleAsHeading: PropTypes.string,
  text: PropTypes.string,
};

export default TextTo;
