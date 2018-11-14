import { astNewApp, astNewFunc, astNewVar } from './ast';

// couldn't figure out how to assign deBruijn indices form the parser,
// because jison doesn't seem to like mid-rule actions
const postParse = ast => {
  const indices = {};
  let deBruijn = 0;

  function rec(node) {
    let res;
    switch (node.type) {
      case 'app':
        res = astNewApp(rec(node.left), rec(node.right));
        break;
      case 'func': {
        const oldIndex = indices[node.param];
        indices[node.param] = deBruijn++;
        res = astNewFunc(node.param, rec(node.body));
        indices[node.param] = oldIndex;
        deBruijn--;
        break;
      }
      case 'ident': {
        const index = indices[node.binding];
        res = astNewVar(node.binding, deBruijn - (index === undefined ? deBruijn : index));
        break;
      }
    }
    return res;
  }

  return rec(ast);
};

export default postParse;
