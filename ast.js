const astNewApp = (left, right) => ({ type: 'app', left, right });
const astNewFunc = (param, body) => ({ type: 'func', param, body });
const astNewVar = (binding, deBruijn) => ({ type: 'ident', binding, deBruijn });

function astToString(node) {
  switch (node.type) {
    case 'app':
      return `${
        node.left.type === 'func' ? '(' : ''
      }${astToString(node.left)}${
        node.left.type === 'func' ? ')' : ''
      }${
        node.right.type !== 'ident' ? '(' : ''
      }${astToString(node.right)}${
        node.right.type !== 'ident' ? ')' : ''
      }`;
    case 'func':
      return `${node.param}->${astToString(node.body)}`;
    case 'ident':
      return node.binding;
  }
};

module.exports = {
  astNewApp,
  astNewFunc,
  astNewVar,
  astToString,
};
