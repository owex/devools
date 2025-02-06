import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { hexToRgba, hexToRgbChannels } from '@/resources/utils/colours';
import { WidgetType } from '@/resources/types/widget.type';
import Button from '@/resources/components/Button';
import Code from '@/resources/components/Code';
import Copyable from '@/resources/components/Copyable';
import Input from '@/resources/components/form/Input';
import WidgetLayout from '@/resources/components/widgets/WidgetLayout';

type Show = 'tailwind' | 'sass' | 'css' | null;
const defaults = {
  label: 'Hex Colour',
  value: '',
  placeholder: `e.g. #5680e9`,
  colorHex: '#5680e9',
  colorName: 'Cornflower Blue',
};

const ColourManager = ({
  title = 'Colour Manager',
  titleAsHeading,
  text = 'Generate a colour palette and RGBA from a hex colour.',
}: WidgetType) => {

  const [opacity, setOpacity] = useState<number>(1);
  const [hexColorName, setHexColorName] = useState('');
  const [hexCode, setHexCode] = useState('');

  const [palette, setPalette] = useState<string[]>([]);
  const [show, setShow] = useState<Show>();

  /**
   * Return a tint or shadow channel value
   *
   * @param   {string}  type
   * @param   {number}  channel
   * @param   {number}  alpha
   *
   * @return  {string}
   */
  const getChannelTintOrShade = (type: string, channel: number, alpha: number) => {
    const value =
      type === 'tints'
        ? channel + (255 - channel) * (alpha / 10)
        : channel * (alpha / 10);
    return Math.round(value);
  };

  const rgba = useMemo(() => {
    const hexColor = hexCode || defaults.colorHex;
    /**
    * Returns an array of tints or shades from a given hex colour.
    *
    * @param   {string}  type      The type of colour palette to generate, either 'tints' or 'shades'.
    * @param   {number}  [count=11] The number of colours to generate. Must be a positive integer.
    * @param   {Object}  rgb       An object containing r, g and b properties.
    *
    * @return  {string[]} An array of hex colours.
    */
    const getShadesOrTint = (type: string, count: number = 11, rgb: { r: number; g: number; b: number }) => {
      const { r, g, b } = rgb;
      const colours = [];
      // get
      for (let i = 0; i < count; i++) {
        const newRgb = [];
        newRgb.push(getChannelTintOrShade(type, r, i));
        newRgb.push(getChannelTintOrShade(type, g, i));
        newRgb.push(getChannelTintOrShade(type, b, i));
        const hexCodes = newRgb.map((channelValue) => {
          const hex = channelValue.toString(16);
          return hex.length == 1 ? '0' + hex : hex;
        });
        colours.push(`#${hexCodes.join('')}`);
      }

      return type === 'tints' ? colours.reverse() : colours;
    };
    /**
     * Generates a colour palette from a given hex colour.
     *
     * @param   {string}  hexValue  The hex colour to generate a palette from.
     *
     * @return  {void}
     */
    const generatePalette = (hexValue: string) => {
      const rgb = hexToRgbChannels(hexValue);
      const tints = getShadesOrTint('tints', 11, rgb);
      const shades = getShadesOrTint('shades', 11, rgb);

      const slicedTints = tints.slice(Math.max(tints.length - 6, 0));
      const slicedShades = [...shades.slice(Math.max(shades.length - 5, 0))];

      setPalette(
        [...slicedShades.concat(slicedTints.reverse().splice(1))].reverse()
      );
    };

    let hexValue = hexColor.replace('#', '');
    if ([3, 6].includes(hexValue.length)) {
      // Convert Shorthand to Long
      if (hexValue.length === 3) {
        let longhex = '';
        for (const char of hexValue) {
          longhex += `${char}${char}`;
        }
        hexValue = longhex;
      }

      generatePalette(hexValue);

      return hexToRgba(hexValue, opacity);
    }
  }, [hexCode, opacity]);

  /**
   * Takes an array of hex colour values and formats them for code generation.
   *
   * @param   {string[]}  items  An array of hex colour values.
   *
   * @return  {Array<{colorValue: number, hexCode: string}>} An array of objects with `colorValue` and `hexCode` properties.
   */
  const formatForCode = (items: string[]) => {
    return [...items].reverse().map((item, index) => {
      return {
        colorValue: (10 - index) * 100,
        hexCode: item,
      };
    });
  };

  const tailwindCode = useMemo(() => {
    const colorName = hexColorName || defaults.colorName;
    const colorHex = hexCode || defaults.colorHex;
    let code = `'${colorName.replace(/\s+/g, '-').toLowerCase() ?? 'colorName'
      }': {\n`;
    code += `\tdefault: '${colorHex}', \n`;

    [...formatForCode(palette)].forEach((item) => {
      code += `\t${item.colorValue}: '${item.hexCode}', \n`;
    });

    code += `},`;
    return code;
  }, [hexColorName, palette, hexCode]);

  const cssCode = useMemo(() => {
    const colorName = (hexColorName || defaults.colorName)
      .replace(/\s+/g, '-')
      .toLowerCase();
    let code = `:root {\n`;
    [...formatForCode(palette)].forEach((item) => {
      code += `\t--${colorName}-${item.colorValue}: ${item.hexCode}; \n`;
    });
    code += `}`;
    return code;
  }, [hexColorName, palette]);

  const sassCode = useMemo(() => {
    const colorName = (hexColorName || defaults.colorName)
      .replace(/\s+/g, '-')
      .toLowerCase();
    let code = ``;
    [...formatForCode(palette)].forEach((item) => {
      code += `$${colorName}-${item.colorValue}: ${item.hexCode}; \n`;
    });

    return code;
  }, [hexColorName, palette]);

  const Palette = ({ palette = [], isDark }: { palette: string[]; isDark?: boolean }) => {
    return (
      <div className="flex flex-wrap">
        {palette.map((colour) => (
          <div
            key={`paletteKeyColour${colour}`}
            className="flex flex-col justify-center items-center"
            style={{
              backgroundColor: colour,
              width: '10%',
              height: '50px',
            }}
          >
            <div
              className={classNames('text-xs', {
                'text-white': isDark,
                'text-black': !isDark,
              })}
            >
              {colour}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <WidgetLayout title={title} titleAsHeading={titleAsHeading} text={text}>
      <label className="text-xs font-bold">{defaults.label}</label>
      <div className="flex">
        <div className="w-full lg:w-3/4">
          <Input
            type="text"
            maxLength={6}
            value={hexCode}
            onChange={(e) => setHexCode(e.target.value)}
            placeholder={defaults.placeholder}
          />
        </div>
        <div className="w-full lg:w-1/4 ml-2">
          <Input
            type="text"
            value={hexColorName}
            onChange={(e) => setHexColorName(e.target.value)}
            placeholder={defaults.colorName}
          />
        </div>
      </div>
      <div className="my-5 bg-slate-200">
        <Copyable text={rgba || ''} />
      </div>
      <div className="mb-5">
        <input
          className="w-full"
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setOpacity(Number(e.target.value));
          }}
          list="tickmarks"
          id="opacity"
        />
        <datalist id="tickmarks">
          <option value="0" label="Visible" />
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((val) => (
            <option key={`tickmarks${val}`} value={val} />
          ))}
        </datalist>
      </div>
      <div className="my-2">
        <p className="text-xs font-bold">Palette</p>
        <Palette palette={palette} />
      </div>
      <div className="flex items-end justify-end space-x-5">
        <Button className="mt-3" onClick={() => setShow('tailwind')}>
          Show Tailwind
        </Button>
        <Button className="mt-3" onClick={() => setShow('sass')}>
          Show Sass
        </Button>
        <Button className="mt-3" onClick={() => setShow('css')}>
          Show CSS
        </Button>
      </div>
      {show && (
        <div className="flex flex-wrap mt-1">
          <div className="w-full">
            {show === 'tailwind' && (
              <Code language="javascript" code={tailwindCode} />
            )}
          </div>
          <div className="w-full">
            {show === 'css' && <Code language="css" code={cssCode} />}
          </div>
          <div className="w-full">
            {show === 'sass' && <Code language="sass" code={sassCode} />}
          </div>
          <a
            className="w-full text-xs text-gray-500 text-right"
            href="https://tailwindcss.com/docs/customizing-colors"
            rel="nofollow"
            target="_blank"
          >
            Learn more
          </a>
        </div>
      )}
    </WidgetLayout>
  );
};

ColourManager.propTypes = {
  title: PropTypes.string,
  titleAsHeading: PropTypes.string,
  text: PropTypes.string,
};

export default ColourManager;
