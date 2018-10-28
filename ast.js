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

module.exports = {
  astNewApp,
  astNewFunc,
  astNewVar,
  astToPrintTokens,
  astToString,
  printTokens,
};
