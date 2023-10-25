import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import slugify from 'slugify';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import WidgetLayout from '@/components/widgets/WidgetLayout';
import Heading from '../Heading';
import Code from '../Code';

const ListGenerator = ({
  title = 'HTML List Generator',
  titleAsHeading = '',
  text = '',
}) => {
  const [rules, setRules] = useState({
    ul: true,
    ol: false,
    paragraph: false,
    break: false,
    anchor: false,
    inline: false,
    captalise: false,
  });
  const [input, setInput] = useState('');
  const ruleChange = (rule) => {
    setRules({
      ...rules,
      ul: false,
      ol: false,
      paragraph: false,
      break: false,
      [rule]: true,
    });
  };

  const output = useMemo(() => {
    let newline = '\n';
    if (rules.inline) {
      newline = '';
    }
    let text = input;

    // Split to new line;
    text = text.split('\n');

    // Loop lines
    let newOutput = '';

    if (rules.ul) {
      newOutput += '<ul>';
    }

    if (rules.ol) {
      newOutput += '<ol>';
    }

    if (rules.ol || (rules.ul && rules.inline === false)) {
      newOutput += newline;
    }
    // Loop
    for (var i = 0; i < text.length; i++) {
      if (rules.ul || rules.ol) {
        newOutput += '<li>';
      }

      if (rules.paragraph) {
        newOutput += '<p>';
      }

      if (rules.anchor) {
        newOutput += '<a href="">';
      }

      if (rules.captalise) {
        newOutput += text[i].toUpperCase();
      } else {
        newOutput += text[i];
      }

      if (rules.anchor) {
        newOutput += '</a>';
      }

      if (rules.paragraph) {
        newOutput += '</p>';
      }

      if (rules.ul || rules.ol) {
        newOutput += '</li>';
      }

      if (rules.break) {
        newOutput += '<br />';
      }
      newOutput += newline;
    }

    if (rules.ol) {
      newOutput += '</ol>';
    }

    if (rules.ul) {
      newOutput += '</ul>';
    }

    return newOutput;
  }, [input, rules]);

  return (
    <div>
      <WidgetLayout
        title={title}
        titleAsHeading={titleAsHeading}
        text={text}
        page="/tools/list-generator"
      >
        <div className="flex flex-wrap gap-x-2">
          <Button className="mr-2" onClick={() => ruleChange('ol')}>
            ol
          </Button>
          <Button className="mr-2" onClick={() => ruleChange('ul')}>
            ul
          </Button>
          <Button className="mr-2" onClick={() => ruleChange('break')}>
            br
          </Button>
          <Button className="mr-2" onClick={() => ruleChange('paragraph')}>
            p
          </Button>
        </div>
        <div className="mt-3 p-2 border">
          <textarea
            className="w-full focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => setInput(e.target.value)}
            placeholder="my list item"
            rows="5"
          ></textarea>
        </div>
        <div className="relative mt-3">
          <Code language="markup" code={output} />
        </div>
        <div className="mt-2">
          {input.length} characters | {input.split(/\b[\s,\.-:;]*/).length}{' '}
          words
        </div>
      </WidgetLayout>
    </div>
  );
};

export default ListGenerator;
