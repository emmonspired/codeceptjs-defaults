/// <reference path="../../steps.d.ts" />

Feature('ProofOfConcept');

const assert = require('assert');
const faker = require('faker');

Scenario('POC SanityCheck', async (I, GoogleSheetsData, EnvironmentData) => {
    
    assert.ok('SanityCheck');   

}).tag('@POC').tag('@SanityCheck');

Scenario('POC ForceFail', async (I, GoogleSheetsData, EnvironmentData) => {
    
    assert.fail('forcing failure');   

}).tag('@POC').tag('@ForceFail');

Scenario('Try out the faker library', async(I) => {

    I.say('address','green');
    I.say(faker.address.zipCode('#####'));
    I.say(faker.address.city());
    I.say(faker.address.cityPrefix());
    I.say(faker.address.citySuffix());
    I.say(faker.address.streetName());
    I.say(faker.address.streetAddress());
    I.say(faker.address.streetSuffix());
    I.say(faker.address.streetPrefix());
    I.say(faker.address.secondaryAddress());
    I.say(faker.address.county());
    I.say(faker.address.country());
    I.say(faker.address.countryCode());
    I.say(faker.address.state());
    I.say(faker.address.stateAbbr());
    I.say(faker.address.latitude());
    I.say(faker.address.longitude());

    I.say('commerce','green');
    I.say(faker.commerce.color());
    I.say(faker.commerce.department());
    I.say(faker.commerce.productName());
    I.say(faker.commerce.price());
    I.say(faker.commerce.productAdjective());
    I.say(faker.commerce.productMaterial());
    I.say(faker.commerce.product());

    I.say('company', 'green');
    I.say(faker.company.suffixes());
    I.say(faker.company.companyName());
    I.say(faker.company.companySuffix());
    I.say(faker.company.catchPhrase());
    I.say(faker.company.bs());
    I.say(faker.company.catchPhraseAdjective());
    I.say(faker.company.catchPhraseDescriptor());
    I.say(faker.company.catchPhraseNoun());
    I.say(faker.company.bsAdjective());
    I.say(faker.company.bsBuzz());
    I.say(faker.company.bsNoun());

    I.say('database', 'green');
    I.say(faker.database.column());
    I.say(faker.database.type());
    I.say(faker.database.collation());
    I.say(faker.database.engine());

    I.say('date', 'green');
    I.say(faker.date.past());
    I.say(faker.date.future());
    I.say(faker.date.between());
    I.say(faker.date.recent());
    I.say(faker.date.month());
    I.say(faker.date.weekday());

    I.say('finance', 'green');
    I.say(faker.finance.account());
    I.say(faker.finance.accountName());
    I.say(faker.finance.mask());
    I.say(faker.finance.amount());
    I.say(faker.finance.transactionType());
    I.say(faker.finance.currencyCode());
    I.say(faker.finance.currencyName());
    I.say(faker.finance.currencySymbol());
    I.say(faker.finance.bitcoinAddress());
    I.say(faker.finance.iban());
    I.say(faker.finance.bic());

    I.say('hacker', 'green');
    I.say(faker.hacker.abbreviation());
    I.say(faker.hacker.adjective());
    I.say(faker.hacker.noun());
    I.say(faker.hacker.verb());
    I.say(faker.hacker.ingverb());
    I.say(faker.hacker.phrase());

    I.say('helpers', 'green');
    I.say(faker.helpers.randomize());
    I.say(faker.helpers.slugify('This is the coolest blog title'));
    I.say(faker.helpers.replaceSymbolWithNumber(`@pple !#$%^&*()`));
    I.say(faker.helpers.replaceSymbols(`@pple !#$%^&*()`));
    I.say(faker.helpers.shuffle(['a','b','c','d','e','f','g','h','i','j']));
    I.say(faker.helpers.mustache('what {{something}} {{goes}} {{here}}', {something:'x', goes:'y', here:'z'}));
    I.say(JSON.stringify(faker.helpers.createCard()));
    I.say(JSON.stringify(faker.helpers.userCard()));
    I.say(JSON.stringify(faker.helpers.createTransaction()));
    
    I.say('image', 'green');
    I.say(faker.image.image());
    I.say(faker.image.avatar());
    I.say(faker.image.imageUrl());
    I.say(faker.image.abstract());
    I.say(faker.image.animals());
    I.say(faker.image.business());
    I.say(faker.image.cats());
    I.say(faker.image.city());
    I.say(faker.image.food());
    I.say(faker.image.nightlife());
    I.say(faker.image.fashion());
    I.say(faker.image.people());
    I.say(faker.image.nature());
    I.say(faker.image.sports());
    I.say(faker.image.technics());
    I.say(faker.image.transport());
    I.say(faker.image.dataUri());

    I.say('internet', 'green');
    I.say(faker.internet.avatar());
    I.say(faker.internet.email());
    I.say(faker.internet.exampleEmail());
    I.say(faker.internet.userName());
    I.say(faker.internet.protocol());
    I.say(faker.internet.url());
    I.say(faker.internet.domainName());
    I.say(faker.internet.domainSuffix());
    I.say(faker.internet.domainWord());
    I.say(faker.internet.ip());
    I.say(faker.internet.ipv6());
    I.say(faker.internet.userAgent());
    I.say(faker.internet.color());
    I.say(faker.internet.mac());
    I.say(faker.internet.password());

    I.say('lorem', 'green');
    I.say(faker.lorem.word());
    I.say(faker.lorem.words());
    I.say(faker.lorem.sentence());
    I.say(faker.lorem.slug());
    I.say(faker.lorem.sentences());
    I.say(faker.lorem.paragraph());
    I.say(faker.lorem.paragraphs());
    I.say(faker.lorem.text());
    I.say(faker.lorem.lines());

    I.say('name', 'green');
    I.say(faker.name.firstName());
    I.say(faker.name.lastName());
    I.say(faker.name.findName('bob','jefferson', 1));
    I.say(faker.name.jobTitle());
    I.say(faker.name.prefix());
    I.say(faker.name.suffix());
    I.say(faker.name.title());
    I.say(faker.name.jobDescriptor());
    I.say(faker.name.jobArea());
    I.say(faker.name.jobType());

    I.say('phone', 'green');
    I.say(faker.phone.phoneNumber());
    I.say(faker.phone.phoneNumberFormat(3));
    I.say(faker.phone.phoneFormats());

    I.say('random', 'green');
    I.say(faker.random.number());
    I.say(faker.random.arrayElement());
    I.say(faker.random.objectElement());
    I.say(faker.random.uuid());
    I.say(faker.random.boolean());
    I.say(faker.random.word());
    I.say(faker.random.image());
    I.say(faker.random.locale());
    I.say(faker.random.alphaNumeric());

    I.say('system', 'green');
    I.say(faker.system.fileName());
    I.say(faker.system.commonFileName());
    I.say(faker.system.mimeType());
    I.say(faker.system.commonFileType());
    I.say(faker.system.commonFileExt());
    I.say(faker.system.fileType());
    I.say(faker.system.fileExt());
    I.say(faker.system.directoryPath());
    I.say(faker.system.filePath());
    I.say(faker.system.semver());

}).tag('@POC').tag('@faker');

Scenario('Pass data from this test... to another', async(I, GoogleSheetsData, EnvironmentData) => {
    EnvironmentData.BLAH = 'this is blah';
}).tag('@POC').tag('@FLOW').tag('@PassDataToAnotherTest');

Scenario('Pass data from this test... to another', async(I, GoogleSheetsData, EnvironmentData) => {
    I.say(EnvironmentData.BLAH);
}).tag('@POC').tag('@FLOW').tag('@GetDataFromAnotherTest');

Scenario('Disable javascript alert', async(I) => {

    I.amOnPage('https://www.google.com');
    
    await I.executeScript( () => { alert('Now you see me...'); });    

    I.say('Waiting 3 seconds...');    
    I.wait(3);    

    const observedPopupText = await I.grabPopupText();
    assert.equal(observedPopupText, 'Now you see me...');
    I.acceptPopup();

    await I.executeScript( () => { document.alert = window.alert = alert = () => {}; });

    I.fillField('input[name="q"]',"Now you don't");

    await I.executeScript( () => {
        alert(`Now you don't.`);
        window.alert('You will not see this either.');
        document.alert('Yep - I am a Ninja.');
    });    

    const nonexistentPopupText = await I.grabPopupText();
    I.say(`nonexistentPopupText: ${nonexistentPopupText}`);    

}).tag('@POC').tag('@DisableJSAlert');

Scenario('My First CodeceptJS Test', async (I,GoogleSheetsData) => {
  
    I.amOnPage('https://www.google.com');
    
    I.pressKey('CodeceptJS');
    I.wait(1);
    I.click("I'm Feeling Lucky");
    I.waitInUrl('https://codecept.io/');
    I.click('Guides');
    I.waitInUrl('https://codecept.io/basics');
    I.click('Testing with WebDriver');
    I.scrollPageToBottom();
    I.click('Examples');
    I.fillField('#search_input_react', 'intellisense');
    I.wait(1);    
    await I.pressKey('Enter');
    I.scrollPageToBottom();
    I.click({":css":".docs-next"});
    I.waitForText('Testing with WebDriver');    
    
}).tag('@poc').tag('@navigate-codecept-via-google');