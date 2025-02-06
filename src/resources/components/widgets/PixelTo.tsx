import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import WidgetLayout from '@/resources/components/widgets/WidgetLayout';
import Input from '@/resources/components/form/Input';
import { WidgetType } from '@/resources/types/widget.type';

const PixelTo = ({ title = '', titleAsHeading, text }: WidgetType) => {
  const [base, setBase] = useState<number>(16);
  const [pixel, setPixel] = useState<number>(16);
  const [em, setEm] = useState<number>(1);

  const resultEm = useMemo<number>(() => {
    return parseFloat((pixel / base).toFixed(3));
  }, [pixel, base]);

  const resultPixel = useMemo<number>(() => {
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
          onChange={(e) => setBase(Number(e.target.value))}
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
            onChange={(e) => setPixel(Number(e.target.value))}
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
            onChange={(e) => setEm(Number(e.target.value))}
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
