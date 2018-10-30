const id = a => a;
export const printTokens = ['param', 'bound', 'free', '(', ')', '\\', '.'];

export function astToPrintTokens(node) {
  switch (node.type) {
    case 'app':
      return [
        ...(node.left.type === 'func' ? [['(']] : []),
        ...astToPrintTokens(node.left),
        ...(node.left.type === 'func' ? [[')']] : []),
        ...(node.right.type !== 'ident' ? [['(']] : []),
        ...astToPrintTokens(node.right),
        ...(node.right.type !== 'ident' ? [[')']] : [])
      ];
    case 'func':
      return [['\\'], ['param', node.param], ['.'], ...astToPrintTokens(node.body)];
    case 'ident':
      return [[node.deBruijn === 0 ? 'free' : 'bound', node.binding]];
  }
}

const defaultPrintFunction = token => ({
  '\\': () => '',
  'param': id,
  'free': id,
  'bound': id,
  '.': () => '->',
}[token] || (() => token));

export const astToString = (ast, printFunctions = {}) =>
  astToPrintTokens(ast).map(
    ([type, val]) => (printFunctions[type] || defaultPrintFunction(type))(val)).join('');

const span = (className, body) => `<span class="${className}">${body}</span>`;

const htmlClass = token => ({
  '\\': 'lambda',
  '(': 'lbrac',
  ')': 'rbrac',
  '.': 'dot',
}[token] || token);

const htmlEscape = str =>
  str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export const astToHtmlString = (ast, printFunctions = {}) =>
  span('lambda-listing', astToString(ast, printTokens.reduce((acc, token) => ({
    ...acc,
    [token]: val => span(htmlClass(token),
      htmlEscape((printFunctions[token] ||
        defaultPrintFunction(token))(val))),
  }), {})));
