const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
  },
});
