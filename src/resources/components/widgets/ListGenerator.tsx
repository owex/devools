import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { WidgetType } from '@/resources/types/widget.type';
import Button from '@/resources/components/Button';
import WidgetLayout from '@/resources/components/widgets/WidgetLayout';

const Code = dynamic(() => import('@/resources/components/Code'), {
  ssr: false,
});

type RuleName = 'ul' | 'ol' | 'paragraph' | 'break' | 'anchor' | 'inline' | 'capitalize';

type Rules = {
  ul: boolean;
  ol: boolean;
  paragraph: boolean;
  break: boolean;
  anchor: boolean;
  inline: boolean;
  captalise: boolean;
};

const ListGenerator = ({
  title = 'HTML List Generator',
  titleAsHeading,
  text = '',
}: WidgetType) => {
  const [rules, setRules] = useState<Rules>({
    ul: true,
    ol: false,
    paragraph: false,
    break: false,
    anchor: false,
    inline: false,
    captalise: false,
  });
  const [input, setInput] = useState('');
  /**
   * Change the currently selected rule.
   * @param {RuleName} rule - The name of the rule to select.
   * @example
   * ruleChange('ul'); // select the unordered list rule
   */
  const ruleChange = (rule: RuleName) => {
    setRules({
      ...rules,
      ul: false,
      ol: false,
      paragraph: false,
      break: false,
      [rule]: true,
    });
  };

  const output = useMemo<string>(() => {
    let newline = '\n';
    if (rules.inline) {
      newline = '';
    }
    let text: string | string[] = input;

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
    for (let i = 0; i < text.length; i++) {
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
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyUp={(e) => setInput(e.currentTarget.value)}
            placeholder="my list item"
            rows={5}
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
