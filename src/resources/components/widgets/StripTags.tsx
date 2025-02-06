import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import WidgetLayout from '@/resources/components/widgets/WidgetLayout';
import { WidgetType } from '@/resources/types/widget.type';

const StripTags = ({ title = '', titleAsHeading, text }: WidgetType) => {
  const [input, setInput] = useState<string>(' ');
  const [output, setOutput] = useState<string>(' ');

  useEffect(() => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    setOutput(doc.body.textContent || '');
  }, [input]);

  return (
    <WidgetLayout title={title} titleAsHeading={titleAsHeading} text={text}>
      <div className="my-3 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800">
        <textarea
          className="w-full focus:outline-none bg-inherit"
          placeholder="Start typing or copying your html here..."
          rows={5}
          onKeyUp={(e) => setInput(e.currentTarget.value)}
        ></textarea>
      </div>
      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800">
        <textarea
          className="w-full focus:outline-none bg-inherit"
          rows={5}
          readOnly
          value={output}
        ></textarea>
      </div>
    </WidgetLayout>
  );
};

StripTags.propTypes = {
  title: PropTypes.string,
  titleAsHeading: PropTypes.string,
  text: PropTypes.string,
};

export default StripTags;
