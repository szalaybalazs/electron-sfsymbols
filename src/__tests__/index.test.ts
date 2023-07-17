import sfsymbol, { getSfSymbol } from '../index';
import path from 'path';
import fs from 'fs';

describe('symbols', () => {
  test('folder', async () => {
    console.time('generate');
    const symbol = await getSfSymbol('folder');
    console.timeEnd('generate');

    fs.writeFileSync(
      path.join(__dirname, 'test.png'),
      Buffer.from(symbol.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    expect(symbol).toBeTruthy();
  });
  test('native image', async () => {
    const res = await sfsymbol.getNativeImage('folder');

    expect(res.isEmpty()).toBeFalsy();
  });
});
