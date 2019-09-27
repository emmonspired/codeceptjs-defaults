/// <reference path="../../steps.d.ts" />

Feature('LoginChecks');

const assert = require('assert');

Scenario('Inject GoogleSheetsData.qaSiteDefaults From google-sheets-plugin.js configured in conf/**.conf.js', async (I, GoogleSheetsData) => {
  
  const devSite = GoogleSheetsData.getRawData().qaSiteDefaults['dev'];
  assert.equal('https://www.example.com/', devSite.organicSite);
  assert.equal('https://training.example.com/', devSite.trainingSite);
  assert.equal('https://portal.example.com/', devSite.portalSite);
  
  const prodSite = GoogleSheetsData.getRawData().qaSiteDefaults['prod'];
  assert.equal('https://www.example.com/', prodSite.organicSite);
  assert.equal('https://training.example.com/', prodSite.trainingSite);
  assert.equal('https://portal.example.com/', prodSite.portalSite);

  var expectedHeaders = ['environment', 'organicSite', 'trainingSite', 'token', 'testEmail', 'testPassword', 'salesForceID', 'testDomain', 'uatEmail'];
  for( var e in expectedHeaders ) {
    assert.ok( devSite.hasOwnProperty( expectedHeaders[e] ), expectedHeaders[e] );
  }

}).tag('@Inject_GoogleSheetsData').tag('@qaSiteDefaults');