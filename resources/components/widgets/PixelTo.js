import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import WidgetLayout from '@/components/widgets/WidgetLayout';
import Input from '@/components/form/Input';

const PixelTo = ({ title = '', titleAsHeading = '', text }) => {
  const [base, setBase] = useState(16);
  const [pixel, setPixel] = useState(16);
  const [em, setEm] = useState(1);

  const resultEm = useMemo(() => {
    return parseFloat((pixel / base).toFixed(3));
  }, [pixel, base]);

  const resultPixel = useMemo(() => {
    return parseFloat((base * em).toFixed(3));
  }, [em, base]);

  return (
    <WidgetLayout title={title} titleAsHeading={titleAsHeading} text={text}>
      <div>
        <label className="text-xs font-bold" htmlFor="base">
          Base Pixel
        </label>
        <Input
          type="number"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          id="base"
        />
      </div>
      <div className="flex">
        <div className="w-full md:pr-5">
          <label className="text-xs font-bold" htmlFor="pixel">
            Pixels
          </label>
          <Input
            type="number"
            value={pixel}
            onChange={(e) => setPixel(e.target.value)}
          />
          <p className="mt-1">{resultEm}em</p>
        </div>
        <div className="w-full">
          <label className="text-xs font-bold" htmlFor="em">
            EM/REM
          </label>
          <Input
            type="number"
            value={em}
            onChange={(e) => setEm(e.target.value)}
          />
          <p className="mt-1">{resultPixel}px</p>
        </div>
      </div>
    </WidgetLayout>
  );
};

PixelTo.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default PixelTo;
