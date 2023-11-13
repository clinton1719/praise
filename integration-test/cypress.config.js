const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  retries: {
    runMode: 2,
  },
  e2e: {
    defaultCommandTimeout: 20000,
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
