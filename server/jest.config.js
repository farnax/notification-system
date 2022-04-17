module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['mocks.js'],
  testRegex: '/test/.*\\.(test|spec)?\\.js$',
};
