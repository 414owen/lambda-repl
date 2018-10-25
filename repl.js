const readline = require('readline');
const { allReductionStrings } = require('./index');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function line() {
  rl.question('> ', input => {
    console.log(`${allReductionStrings(input).join('\n')}\n`);
    line();
  });
})();
