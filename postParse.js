const { astNewApp, astNewFunc, astNewVar } = require('./ast');

// couldn't figure out how to assign deBruijn indices form the parser,
// because jison doesn't seem to like mid-rule actions
module.exports = ast => {
  const indices = {};
  let deBruijn = 0;

  function rec(node) {
    let res;
    switch (node.type) {
      case 'app':
        res = astNewApp(rec(node.left), rec(node.right));
        break;
      case 'func':
        indices[node.param] = deBruijn++;
        res = astNewFunc(node.param, rec(node.body));
        deBruijn--;
        break;
      case 'ident':
        res = astNewVar(node.binding, deBruijn - (indices[node.binding] || 0));
        break;
    }
    return res;
  }

  return rec(ast);
};
