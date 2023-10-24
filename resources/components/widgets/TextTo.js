import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import slugify from 'slugify';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import WidgetLayout from '@/components/widgets/WidgetLayout';

const TextTo = ({
  title = 'Text Formatter',
  titleAsHeading = '',
  text = 'Convert text to a URL sluf or Kebab/Snake/Camel case',
}) => {
  const [mode, setMode] = useState('slugify');
  const [input, setInput] = useState('');
  const placeholderText = 'Hello World';

  function toSentenceCase(inputString) {
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

  const formatString = (string, mode) => {
    const isSlugify = mode === 'slugify';
    const isCamelCase = mode === 'camelcase';
    const isStudlyCaps = mode === 'studlycaps';
    const isSentenceCase = mode === 'sentencecase';
    const isKebabCase = mode === 'kebabcase';
    const isSnakeCase = mode === 'snakecase';

    if (isCamelCase || isStudlyCaps) {
      return [...string.trim().toLowerCase().split(' ')]
        .map((str, index) => {
          if (index === 0 && isCamelCase) {
            return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
          }

          return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
        })
        .join(' ')
        .replace(/\s/g, '');
    }

    if (isSnakeCase) {
      return string.toLowerCase().split(' ').join('_');
    }

    if (isKebabCase) {
      return string.split(' ').join('-');
    }

    if (isSentenceCase) {
      return toSentenceCase(string);
    }

    if (isSlugify) {
      return slugify(string, {
        replacement: '-',
        remove: true,
        lower: true,
      });
    }

    return string;
  };

  const output = useMemo(() => {
    return formatString(input, mode);
  }, [input, mode]);

  const outputPlaceholder = useMemo(() => {
    return formatString('Hello World', mode);
  }, [mode]);

  return (
    <div>
      <WidgetLayout
        title={title}
        titleAsHeading={titleAsHeading}
        text={text}
        page="/tools/text-to"
      >
        <div className="flex flex-col gap-y-2 mb-2">
          <Input
            name="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
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

        <div className="flex gap-2">
          {[
            {
              text: 'slugify',
              mode: 'slugify',
            },
            {
              text: 'Sentence Case',
              mode: 'sentencecase',
            },
            {
              text: 'camelCase',
              mode: 'camelcase',
            },
            {
              text: 'StudlyCaps',
              mode: 'studlycaps',
            },
            {
              text: 'Snake_Case',
              mode: 'snakecase',
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
  text: PropTypes.string,
};

export default TextTo;
