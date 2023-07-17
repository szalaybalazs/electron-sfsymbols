import fs from 'fs';
import path from 'path';
import { SfSymbol, SfSymbolOptions, default as sfsymbol, default as symbols } from '../';

describe('symbols', () => {
  test('buffer', async () => {
    console.time('generate');
    sfsymbol;
    const symbol = await symbols.getSfSymbolAsBuffer('folder');
    console.timeEnd('generate');

    fs.writeFileSync(path.join(__dirname, 'test-buffer.png'), symbol);
    expect(symbol).toBeTruthy();
  });
  test('base64', async () => {
    console.time('generate');
    sfsymbol;
    const symbol = await symbols.getSfSymbolAsBase64('folder');
    console.timeEnd('generate');

    fs.writeFileSync(
      path.join(__dirname, 'test-base64.png'),
      Buffer.from(symbol.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    expect(symbol).toBeTruthy();
  });
  test('named colors', async () => {
    const symbol = await symbols.getSfSymbolAsBase64('folder', { primary: 'red' });

    fs.writeFileSync(
      path.join(__dirname, 'test-red.png'),
      Buffer.from(symbol.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    expect(symbol).toBeTruthy();
  });
  test('hex color', async () => {
    const symbol = await symbols.getSfSymbolAsBase64('lungs.fill', {
      primary: '#EF2D56',
      secondary: '#ED7D3A33',
      // tertiary: '#8CD867',
    });

    fs.writeFileSync(
      path.join(__dirname, 'test-hex.png'),
      Buffer.from(symbol.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    expect(symbol).toBeTruthy();
  });
  test('examples', async () => {
    const examples: (SfSymbolOptions & { symbol: SfSymbol; name: string })[] = [
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'monochrome',
        name: 'monochrome',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'hierarchical',
        name: 'hierarchical',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'palette',
        name: 'palette',
        primary: '#fff',
        secondary: '#0f0',
        tertiary: '#0f0',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'multicolor',
        name: 'multicolor',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'multicolor',
        variable: 0,
        name: 'variable-0',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'multicolor',
        variable: 0.5,
        name: 'variable-50',
      },
      {
        symbol: 'speaker.wave.2.circle.fill',
        mode: 'multicolor',
        variable: 1,
        name: 'variable-100',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'ultralight',
        name: 'ultralight',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'thin',
        name: 'thin',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'light',
        name: 'light',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'medium',
        name: 'medium',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'semibold',
        name: 'semibold',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'bold',
        name: 'bold',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'heavy',
        name: 'heavy',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'black',
        name: 'black',
      },
      {
        symbol: 'heart',
        mode: 'multicolor',
        weight: 'regular',
        name: 'regular',
      },
      {
        symbol: 'lungs.fill',
        mode: 'palette',
        name: 'colors-hex',
        primary: '#EF2D56',
        secondary: '#ED7D3A33',
      },
      {
        symbol: 'lungs.fill',
        mode: 'palette',
        name: 'colors-rgb',
        primary: { r: 239, g: 45, b: 86 },
        secondary: { r: 237, g: 125, b: 58, a: 0.4 },
      },
      {
        symbol: 'lungs.fill',
        mode: 'palette',
        name: 'colors-named',
        primary: 'red',
        secondary: 'orange',
      },
      {
        symbol: 'lungs.fill',
        mode: 'palette',
        name: 'colors-array',
        primary: [239, 45, 86],
        secondary: [237, 125, 58, 0.4],
      },
    ];

    await Promise.all(
      examples.map(async ({ symbol, name, ...options }) => {
        const res = await symbols.getSfSymbolAsBuffer(symbol, { size: 32, ...options });
        fs.writeFileSync(path.join(__dirname, '../../images', `example-${name}.png`), res);
      }),
    );

    expect(examples).toBeTruthy();
    // expect(symbol).toBeTruthy();
  }, 60_000);
  // test('native image', async () => {
  //   const res = await sfsymbol.getNativeImage('folder');

  //   expect(res.isEmpty()).toBeFalsy();
  // });
});
