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
  text = 'Convert text to a URL slug or Kebab/Snake/Camel case and more!',
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

  const camelCaseWords = (string) => {
    return [...string.trim().toLowerCase().split(' ')]
      .map((str, index) => {
        if (index === 0) {
          return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
        }

        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
      })
      .join(' ');
  };

  const pascalCaseWords = (string) => {
    return [...string.trim().toLowerCase().split(' ')]
      .map((str, index) => {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
      })
      .join(' ');
  };

  const formatString = (string, mode) => {
    const isSlugify = mode === 'slugify';
    const isCamelCase = mode === 'camelcase';
    const isPascalCase = mode === 'pascalcase';
    const isSentenceCase = mode === 'sentencecase';
    const isKebabCase = mode === 'kebabcase';
    const isSnakeCase = mode === 'snakecase';
    const isFlatCase = mode === 'flatcase';
    const isUpperFlatCase = mode === 'upperflatcase';
    const isPascalSnakeCase = mode === 'pascalsnakecase';
    const isCamelSnakeCase = mode === 'camelsnakecase';
    const isSceamingSnakeCase = mode === 'screamingsnakecase';
    const isTrainCase = mode === 'traincase';
    const isCobolCase = mode === 'cobolcase';

    if (isPascalCase) {
      return pascalCaseWords(string).replace(/\s/g, '');
    }

    if (isCamelCase) {
      return camelCaseWords(string).replace(/\s/g, '');
    }

    if (isCamelSnakeCase) {
      return camelCaseWords(string).replace(/\s/g, '_');
    }

    if (isSnakeCase) {
      return string.toLowerCase().split(' ').join('_');
    }

    if (isSceamingSnakeCase) {
      return string.toUpperCase().split(' ').join('_');
    }

    if (isKebabCase) {
      return string.split(' ').join('-');
    }

    if (isFlatCase) {
      return string.toLowerCase().split(' ').join('');
    }

    if (isUpperFlatCase) {
      return string.toUpperCase().split(' ').join('');
    }

    if (isPascalSnakeCase) {
      return pascalCaseWords(string).split(' ').join('_');
    }

    if (isTrainCase) {
      return pascalCaseWords(string).replace(/\s/g, '-');
    }

    if (isCobolCase) {
      return pascalCaseWords(string).replace(/\s/g, '-').toUpperCase();
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
        page="/tools/text-formatter"
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
  text: PropTypes.string,
};

export default TextTo;
