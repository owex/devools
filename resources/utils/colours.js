export const hexToRgba = (hexValue, opacity) => {
  if (!hexValue) {
    return '';
  }
  const { r, g, b } = hexToRgbChannels(hexValue);

  if (parseFloat(opacity) === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity || ''})`;
};

export const hexToRgbChannels = (hexValue) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
  let r, g, b;
  if (result !== null) {
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
  }

  return {
    r,
    g,
    b,
  };
};
