import fs from 'fs';
import path from 'path';
import { default as sfsymbol, default as symbols } from '../';

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
  // test('native image', async () => {

  //   const res = await sfsymbol.getNativeImage('folder');

  //   expect(res.isEmpty()).toBeFalsy();
  // });
});
