import { exec } from 'child_process';
import { join } from 'path';
import { nativeImage } from 'electron';
import type { SFSymbol as eSymbol } from 'sf-symbols-typescript';

export type SfSymbol = eSymbol;

export type SfSymbolWeight =
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'heavy'
  | 'black'
  | 'regular';
export type SfSymbolMode = 'multicolor' | 'monochrome' | 'palette' | 'hierarchical';
export interface SfSymbolOptions {
  size?: number;
  scale?: number;
  weight?: SfSymbolWeight;
  variable?: number;
  mode?: SfSymbolMode;
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

// 2. size (int)
// 3. weight (enum)
// 4. variable (double)
// 5. mode - todo
// todo: parse colors

const getSfSymbol = (name: SfSymbol, options: SfSymbolOptions = {}, binaryPath?: string): Promise<string> => {
  const binary = binaryPath ?? join(__dirname, '/bin/sfsymbol');

  const params = [
    name,
    (options.size ?? 24) * (options.scale ?? 3),
    options.weight ?? 'monochrome',
    options.variable ?? 1,
    options.mode ?? 'palette',
    options.primary ?? '000000',
    options.secondary ?? '000000',
    options.tertiary ?? '000000',
  ];

  return new Promise((res) => {
    const command = `${binary} ${params.map((p) => `"${p}"`).join(' ')} `;

    exec(command, async (error, stdout) => {
      if (error) {
        throw new Error(`Failed to generate SF Symbol: ${error.message}`);
      }
      res(stdout);
    });
  });
};

export const getSfSymbolAsBuffer = async (
  name: SfSymbol,
  options: SfSymbolOptions = {},
  binaryPath?: string,
): Promise<Buffer> => {
  const symbol = await getSfSymbol(name, options, binaryPath);
  return Buffer.from(symbol.replace(/^data:image\/png;base64,/, ''), 'base64');
};

/**
 * Get SF Symbol as base64 string
 * @param name sf symbol name
 * @param options symbol parameters
 * @param binaryPath path to custom sf symbol binary
 * @returns
 */
export const getSfSymbolAsBase64 = (
  name: SfSymbol,
  options: SfSymbolOptions = {},
  binaryPath?: string,
): Promise<string> => {
  return getSfSymbol(name, options, binaryPath);
};

/**
 * Get SF Symbol as Electron NativeImage
 * @param name sf symbol name
 * @param options symbol parameters
 * @param binaryPath path to custom sf symbol binary
 * @returns
 */
export const getSfSymbolAsNativeImage = async (
  name: SfSymbol,
  options: SfSymbolOptions = {},
  binaryPath?: string,
): Promise<Electron.NativeImage> => {
  if (!nativeImage) throw new Error('Electron is not available');
  const buffer = await getSfSymbolAsBuffer(name, options, binaryPath);
  return nativeImage.createFromBuffer(buffer);
};
