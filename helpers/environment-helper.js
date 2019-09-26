/// <reference path="../steps.d.ts" />
'use strict';
let Helper = codecept_helper;

// Works with `GoogleSheetsData` injected by sheets-plugin
// Works with `EnvironmentData` injected by environment-plugin
class EnvironmentHelper extends Helper {

    // `async` allows us to retrieve info if necessary.
    // I.grab... is the convention used to denote usage with `await`
    // return copied objects of the data so that the tester doesn't accidentally change properties

    async grabCreditCard(GoogleSheetsData={}, EnvironmentData={}) { 
        return Object.assign({}, GoogleSheetsData.getRawData().qaCreditCards[EnvironmentData.QA_DEFAULT_CARD_KEY]);
    }  

    async grabCreditCardForFulfillment(GoogleSheetsData={}, EnvironmentData={}) { 
        return Object.assign({},GoogleSheetsData.getRawData().qaCreditCards[EnvironmentData.QA_FULFILLMENT_CARD_KEY]);
    }  

    async grabAccountForEmail( GoogleSheetsData={}, email = "" ) {
        
        const qaTestAccountsMap = new Map(Object.entries(GoogleSheetsData.getRawData().qaTestAccounts));
        const qaTestAccountObjects = Array.from(qaTestAccountsMap.values());                

        var account = qaTestAccountObjects.find( (account) => (account.email === email) );        
        return Object.assign({},account); // copied object of the data so that the tester doesn't change properties
    }

    async grabCrawlerExclusions( GoogleSheetsData={}, EnvironmentData={} ) {
        const qaCrawlerExclusions = new Map(Object.entries(GoogleSheetsData.getRawData().qaCrawlerExclusions));
        return qaCrawlerExclusions;
    }

    async grabAccountForLevelAndDescription( GoogleSheetsData={}, level, description ) {
        
        const qaTestAccountsMap = new Map(Object.entries(GoogleSheetsData.getRawData().qaTestAccounts));
        const qaTestAccountObjects = Array.from(qaTestAccountsMap.values());                

        var account = qaTestAccountObjects.find( (account) => { 
            return (account.level === level && account.description === description); 
        });        
        return Object.assign({},account); // copied object of the data so that the tester doesn't change properties
    }

    grabSiteDefaults( GoogleSheetsData={}, EnvironmentData={} ) {
        return Object.assign({}, GoogleSheetsData.getRawData().qaSiteDefaults[EnvironmentData.QA_ENV]);
    }

    async grabNewmanCollections( GoogleSheetsData={}, EnvironmentData={} ) {
        return Object.assign({}, GoogleSheetsData.getRawData().qaNewmanCollections );
    }

    async grabNewmanCollection( GoogleSheetsData={}, EnvironmentData={}, collectionName="QA-Journeys" ) {
        return Object.assign({}, GoogleSheetsData.getRawData().qaNewmanCollections[collectionName] );
    }

    async grabCoreAPIEnvironment( GoogleSheetsData={}, EnvironmentData={}, environmentName="Staging" ) {
        return Object.assign({}, GoogleSheetsData.getRawData().qaCoreAPIEnvironments[environmentName] );
    }
    
}

module.exports = EnvironmentHelper;