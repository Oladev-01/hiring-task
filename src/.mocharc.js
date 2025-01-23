module.exports = {
  require: 'ts-node/register',
  spec: 'controllers/**/*.test.ts',
  timeout: 5000,
  reporter: 'spec'
};