/// <reference path="../../steps.d.ts" />

Feature('LoginChecks');

const assert = require('assert');

Scenario('Inject GoogleSheetsData.qaTestAccounts From google-sheets-plugin.js configured in codecept.conf.js', async (I, GoogleSheetsData) => {
  var emailAddress = 'username@gmail.com';
  var account = GoogleSheetsData.getRawData().qaTestAccounts[emailAddress];
  assert.equal(emailAddress, account.email);
  
  var expectedHeaders = ['email', 'guid', 'salesForceAccountID', 'password', 'level', 'description', 'purchaseDate', 'purchasePrice'];
  for( var e in expectedHeaders ) {
    assert.ok( account.hasOwnProperty( expectedHeaders[e] ), expectedHeaders[e] );
  }

}).tag('@Inject_GoogleSheetsData').tag('@qaTestAccounts');

Scenario('Inject GoogleSheetsData.qaCreditCards From google-sheets-plugin.js configured in codecept.conf.js', async (I, GoogleSheetsData) => {
  var cardKey = 'dev-default'; // prod-default, prod-phil, prod-dan, dev-steven, etc.
  var cc = GoogleSheetsData.getRawData().qaCreditCards[cardKey];
  assert.equal(4111111111111111, cc.cardNumber);
  
  var expectedHeaders = ['key', 'environment', 'firstName', 'lastName', 'cardNumber', 'securityCode', 'expirationMonth', 'expirationYear'];
  for( var e in expectedHeaders ) {
    assert.ok( cc.hasOwnProperty( expectedHeaders[e] ), expectedHeaders[e] );
  }

}).tag('@Inject_GoogleSheetsData').tag('@qaCreditCards');

Scenario('Inject GoogleSheetsData.qaTestAccounts From google-sheets-plugin.js configured in codecept.conf.js', async (I, GoogleSheetsData) => {
  
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

Scenario('Test Accounts Using GoogleSheetsData', async (I, GoogleSheetsData, EnvironmentData) => {

  // demonstrate that we could use the raw map in GoogleSheetsData, or convert to ES6 Map / Arrays
  const qaTestAccountsMap = new Map(Object.entries(GoogleSheetsData.getRawData().qaTestAccounts));
  const qaTestAccountObjects = Array.from(qaTestAccountsMap.values());

  const isFailureTest = (account) => account.email.includes("+failure.test");
  const isNormalTest = (account) => !isFailureTest(account);

  const portalSite = (await I.grabSiteDefaults(GoogleSheetsData, EnvironmentData)).portalSite;

  qaTestAccountObjects.filter( isFailureTest ).forEach( account => {
    I.say(account.email);        
    //todo
  });

  qaTestAccountObjects.filter( isNormalTest ).forEach( account => {
    I.say(account.email);    
    //todo
  });  

}).tag('@qaTestAccounts');