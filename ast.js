const astNewApp = (left, right) => ({ type: 'app', left, right });
const astNewFunc = (param, body) => ({ type: 'func', param, body });
const astNewVar = (binding, deBruijn) => ({ type: 'ident', binding, deBruijn });

const id = a => a;
const printTokens = ['param', 'bound', 'free', '(', ')', '\\', '.'];

function astToPrintTokens(node) {
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
};

const defaultMap = {
  '\\': () => '',
  'param': id,
  'free': id,
  'bound': id,
};

const astToString = (ast, map = {}) =>
  astToPrintTokens(ast).map(
    ([type, val]) => (map[type] || defaultMap[type] || (() => type))(val)).join('');

const classNameMap = {
  '\\': 'lambda',
  '(': 'lbrac',
  ')': 'rbrac',
  '.': 'dot',
};

const span = (className, str) => `<span className="${className}">${str}</span>`;

astToHtmlString = ast => astToString(ast, {
  ...(printTokens.reduce((acc, token) => {
    const className = classNameMap[token] || token;
    return ({ ...acc, [token]: val => span(className, val || token) });
  }, {}))
});

module.exports = {
  astNewApp,
  astNewFunc,
  astNewVar,
  astToPrintTokens,
  astToString,
  astToHtmlString,
};
