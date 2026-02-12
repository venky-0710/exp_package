/**
 * A simple module ready for npm.
 */

function greet(name = "World") {
  return `Hello, ${name}!`;
}

module.exports = { greet };
