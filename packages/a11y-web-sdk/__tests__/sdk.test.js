const { MarkSDK } = require('../src/index');
import { codeGenerate } from '../../a11y-webpack-loader/src/code-generate';

test('renders initial test', () => {
  const markSDK = new MarkSDK({
    product_id: 'localhost',
  });
  markSDK.init();

  expect(markSDK.wsIO).toBeDefined();
});

const commonOptions = {
  customProperty: 'a11y',
  customIdProperty: `a11y-id`,
  fileIdentifier: '',
  filePath: '',
  customSeparator: '_',
  options: {},
  relativePath: '',
};

describe('code generate test', () => {
  it('Basic JSX test', () => {
    const code = `<div>123</div>`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(
      '<div a11y-id="eb525108">123</div>;',
    );
  });

  it('Nested JSX child element test', () => {
    const code = `<div><span>123</span></div>`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(
      '<div a11y-id="eb525108"><span a11y-id="72a68637">123</span></div>;',
    );
  });

  it('Test for JSX child elements that are nested and have the same child elements', () => {
    const code = `<div><div>123</div><div>123</div></div>`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(
      '<div a11y-id="eb525108"><div a11y-id="befcbbfc">123</div><div a11y-id="d3a51dfe">123</div></div>;',
    );
  });

  it('Test for repeated definition of the a11y-id attribute', () => {
    const code = `<div a11y-id="123">123</div>`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe('<div a11y-id="123">123</div>;');
  });

  it('Test for data-driven dynamic rendering', () => {
    const code = `
  <div>
    {
      [1,2,3].map(item => <div key={item}>123</div>)
    }
  </div>
`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`<div a11y-id="eb525108">
    {[1, 2, 3].map(item => <div key={item} a11y-id="befcbbfc">123</div>)}
  </div>;`);
  });

  it('Test for components declared as anonymous functions', () => {
    const code = `const ASD = function(){
      return <div>123</div>;
    }`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`const ASD = function () {
  return <div a11y-id="831e0231">123</div>;
};`);
  });

  it('Test for components declared as arrow functions', () => {
    const code = `const ASD = () => {
      return <div>123</div>;
    }`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`const ASD = () => {
  return <div a11y-id="831e0231">123</div>;
};`);
  });

  it('React.createElement test', () => {
    const code = `React.createElement('div', null, 'a11y')`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`React.createElement('div', {
  "a11y-id": "eb525108"
}, 'a11y');`);
  });

  it('react.createElement test', () => {
    const code = `react.createElement('div', null, 'a11y')`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`react.createElement('div', {
  "a11y-id": "eb525108"
}, 'a11y');`);
  });

  it('React.createElement test when the property is declared as {}', () => {
    const code = `React.createElement('div', {}, 'a11y')`;
    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`React.createElement('div', {
  "a11y-id": "eb525108"
}, 'a11y');`);
  });

  it('React.createElement test when the property is declared using Object.assign', () => {
    const code = `React.createElement('div', Object.assign({}), 'a11y')`;

    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(
      `React.createElement('div', Object.assign({}), 'a11y');`,
    );
  });

  it('React.createElement test when the property is declared using Object.assign and content is not empty', () => {
    const code = `React.createElement('div', Object.assign({a:1}), 'a11y')`;

    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options))
      .toBe(`React.createElement('div', Object.assign({
  a: 1
}), 'a11y');`);
  });

  it('React.createElement test when the property is declared using Object.assign, with non-empty content, and with nested components', () => {
    const code = `React.createElement("div", Object.assign({a:1}), React.createElement("span", Object.assign({a:1}), "a11y"));`;

    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options))
      .toBe(`React.createElement("div", Object.assign({
  a: 1
}), React.createElement("span", Object.assign({
  a: 1
}), "a11y"));`);
  });

  it('Nested React.createElement attributes test', () => {
    const code = `React.createElement("div", null, React.createElement("span", null, "a11y"));`;

    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`React.createElement("div", {
  "a11y-id": "eb525108"
}, React.createElement("span", {
  "a11y-id": "72a68637"
}, "a11y"));`);
  });

  it('Test for repeated definition of the a11y-id attribute using React.createElement', () => {
    const code = `React.createElement("div", { "a11y-id": "123" })`;

    const options = {
      tagsCounter: {},
      md5ValueMap: {},
      ...commonOptions,
    };

    expect(codeGenerate(code, options)).toBe(`React.createElement("div", {
  "a11y-id": "123"
});`);
  });
});
