const readline = require('readline');
const { astToString } = require('./ast');
const { allReductions } = require('./eval');
const parser = require("./parser").parser;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function line() {
  rl.question('> ', input => {
    const output = allReductions(parser.parse(input))
      .map(astToString)
      .join('\n');
    console.log(output);
    line();
  });
})();
