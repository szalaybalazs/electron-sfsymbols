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
        primary: 'FFFFFFFF',
        secondary: '00FF00FF',
        tertiary: '00FF00FF',
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
    ];

    await Promise.all(
      examples.map(async ({ symbol, name, ...options }) => {
        const res = await symbols.getSfSymbolAsBuffer(symbol, { size: 16, ...options });
        fs.writeFileSync(path.join(__dirname, '../../images', `example-${name}.png`), res);
      }),
    );

    expect(examples).toBeTruthy();
    // expect(symbol).toBeTruthy();
  });
  // test('native image', async () => {

  //   const res = await sfsymbol.getNativeImage('folder');

  //   expect(res.isEmpty()).toBeFalsy();
  // });
});
