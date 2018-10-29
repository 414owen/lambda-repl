export const astNewApp = (left, right) => ({ type: 'app', left, right });
export const astNewFunc = (param, body) => ({ type: 'func', param, body });
export const astNewVar = (binding, deBruijn) => ({ type: 'ident', binding, deBruijn });
