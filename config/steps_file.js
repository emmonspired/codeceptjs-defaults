/* eslint-disable func-names */
/// <reference path="../steps.d.ts" />
const { testData, loginPage } = inject();
// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    async grabVideosReport() {
      const blocked = await this.grabTextFromAll(({ xpath: '//*[@data-icon="lock-alt"]/..' }));
      const total = await this.grabTextFromAll(({ css: 'div.card--2KOIz > h2' }));
      console.log('Total videos:', total);
      console.log('Videos blocked from total:', blocked);
    },
    async login() {
      this.amOnPage(loginPage.url);
      this.fillField('Email', testData.qaTestEmail);
      this.fillField('Password', testData.qaTestPassword);
      this.click('Log In');
      this.wait(3);
    }

  });
};
