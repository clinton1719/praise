const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  video: false,
  waitForAnimations: true,
  retries: {
    runMode: 2,
  },
  e2e: {
    requestTimeout: 10000,
    defaultCommandTimeout: 25000,
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
