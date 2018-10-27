const { astNewApp, astNewFunc, astNewVar } = require('./ast');

function rebindPlaceholder(placeholder, node, val, deBruijn) {
  switch (node.type) {
    case 'app':
      return astNewApp(
        rebindPlaceholder(placeholder, node.left, val, deBruijn),
        rebindPlaceholder(placeholder, node.right, val, deBruijn)
      );
      break;
    case 'func':
      return (placeholder !== node.param
        ? astNewFunc(node.param,
          rebindPlaceholder(placeholder, node.body, val, deBruijn + 1))
        : node
      );
      break;
    case 'ident':
      return (node.deBruijn === deBruijn ?
        (val.type === 'ident' ? astNewVar(val.binding, 0) : val) : node);
  }
};

// reduce an expression by a single beta-reduction
function singleReduction(node) {
  if (node.type === 'app') {
    if (node.left.type === 'func') {
      return rebindPlaceholder(node.left.param, node.left.body, node.right, 1);
    }
    const sub = singleReduction(node.left);
    if (sub) {
      return astNewApp(sub, node.right);
    }
  }
  return null;
};

// first element is starting AST
const allReductions = node => {
  const res = [];
  while (node) {
    res.push(node);
    node = singleReduction(node);
  }
  return res;
};

module.exports = {
  singleReduction,
  allReductions,
};

