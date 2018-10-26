const { astToString } = require('./ast');
const { allReductions, singleReduction } = require('./eval');
const parser = require("./parser").parser;

const parse = input => parser.parse(input);

const allReductionStrings = input =>
  allReductions(parse(input)).map(astToString);

module.exports = {
  allReductionStrings,
  astToString,
  parse,
  singleReduction,
};
