const { astToString, printTokens } = require('./ast');

const classNameMap = {
  '\\': 'lambda',
  '(': 'lbrac',
  ')': 'rbrac',
  '.': 'dot',
};

const span = (className, str) => `<span class="${className}">${str}</span>`;

const astToHtmlString = ast => span('lambda-calculus', astToString(ast, {
  ...(printTokens.reduce((acc, token) => {
    const className = classNameMap[token] || token;
    return ({ ...acc, [token]: val => span(className, val || token) });
  }, {}))
}));

module.exports = astToHtmlString;
