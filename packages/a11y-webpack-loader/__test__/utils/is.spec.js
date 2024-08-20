import { isShouldHandle } from '../../src/utils/is';

describe('test isShouldHandle function', () => {
  it('not jsx files', () => {
    expect(isShouldHandle('index.ts', '<div>123</div>')).toBe(false);
  });

  it('is jsx files', () => {
    expect(isShouldHandle('index.tsx', '<div>123</div>')).toBe(true);
  });

  it('not jsx files and not React.createElement', () => {
    expect(isShouldHandle('index.ts', '<div>123</div>')).toBe(false);
  });

  it('not jsx files and is React.createElement', () => {
    expect(isShouldHandle('index.ts', `React.createElement('div', null, 'a11y')`)).toBe(true);
  });
});
