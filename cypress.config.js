const { defineConfig } = require('cypress')
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.applitools.com',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    env: {
      ACME_USERNAME: process.env.ACME_USERNAME,
      ACME_PASSWORD: process.env.ACME_PASSWORD,
      ACME_DISPLAY_NAME: process.env.ACME_DISPLAY_NAME
    }
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: {
    runMode: 1,
    openMode: 0
  },
  video: true,
  videosFolder: 'cypress/videos'
})
