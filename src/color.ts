import { SfNamedColor, namedColors } from './colors';
import { SfSymbolColor } from './sfsymbol';

const hex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
const generateHex = (r: number, g: number, b: number, a: number) => {
  return `${hex(r)}${hex(g)}${hex(b)}${hex(a)}`.toUpperCase();
};

const processStringColor = (color: string): string => {
  try {
    if (color in namedColors) return namedColors[color as SfNamedColor].toUpperCase();
    if (color.startsWith('#')) {
      const col = color.slice(1);
      if (![3, 6, 8].includes(col.length)) {
        console.error(
          `The color ${color} is not a valid hex color. Hex colors must start with a # and be 3, 6, or 8 characters long.`,
        );
        throw new Error('UNRECOGISED_COLOR');
      }
      let r = 0,
        g = 0,
        b = 0,
        a = 255;
      if (col.length === 3) {
        [r, g, b] = col.split('').map((c) => parseInt(c.repeat(2), 16));
      } else {
        [r, g, b, a = 255] = col.match(/.{2}/g)!.map((c) => parseInt(c || '255', 16));
      }
      return generateHex(r, g, b, a);
    }
    console.error(
      `The type of the color ${color} could not be determined. Please use a named color, a hex color, or an object/array of RGBA values.`,
    );
    throw new Error('UNRECOGISED_COLOR');
  } catch (error: any) {
    console.error(
      `Error during processing of color ${color}. Please use a named color, a hex color, or an object/array of RGBA values.`,
      error.message,
    );
    throw new Error('UNRECOGISED_COLOR');
  }
};
export const processColor = (color: SfSymbolColor) => {
  if (typeof color === 'string') {
    return processStringColor(color);
  } else if (Array.isArray(color)) {
    const [r, g, b, a = 1] = color;

    return generateHex(r, g, b, a * 255);
  } else if (typeof color === 'object') {
    const { r, g, b, a = 1 } = color;

    return generateHex(r, g, b, a * 255);
  }

  throw new Error('UNRECOGISED_COLOR');
};
