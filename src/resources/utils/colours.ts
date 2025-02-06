  /**
   * Returns a string representation of a hex colour as an RGBA value.
   * If opacity is not provided, or is NaN, the returned string will be an RGB value.
   *
   * @param   {string}  hexValue  The hex value to convert to an RGBA value.
   * @param   {number}  [opacity] The opacity of the colour. Must be a number between 0 and 1.
   *
   * @return  {string} The RGBA value of the given hex colour.
   */
export const hexToRgba = (hexValue: string, opacity?: number): string => {
  if (!hexValue) {
    return '';
  }
  const { r, g, b } = hexToRgbChannels(hexValue);

  if (opacity === undefined || isNaN(opacity)) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

  /**
   * Converts a hex colour value to an object containing separate RGB values.
   *
   * @param   {string}  hexValue  The hex value to convert to an RGB object.
   *
   * @return  {{ r: number; g: number; b: number }} An object containing the separate RGB values of the given hex colour.
   *
   * @throws  {Error}  If the given hex colour is not in a valid format.
   */
export const hexToRgbChannels = (hexValue: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  throw new Error('Invalid hex color format');
};
