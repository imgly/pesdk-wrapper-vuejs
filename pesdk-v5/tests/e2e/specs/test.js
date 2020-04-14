// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('.pesdk-desktop-editor')
      .assert.elementCount('canvas', 1)
      .end();
  }
};
