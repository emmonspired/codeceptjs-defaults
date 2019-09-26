/// <reference path="../steps.d.ts" />
'use strict';
const Helper = codecept_helper;
const assert = require('assert');
const {SimpleGoogleMail} = require('simple-google-mail');

class CustomEmailHelper extends Helper {   
    
    constructor() {
        super();
        this.mailObjects = {};
    }

    getMailObject( emailAddress ) {
        if( this.mailObjects[emailAddress] === undefined ) {
            this.mailObjects[emailAddress] = this.buildSimpleGoogleMail(emailAddress);    
        }
        return this.mailObjects[emailAddress];
    }

    buildSimpleGoogleMail( emailAddress ) {
        return new SimpleGoogleMail({
            SCOPES: ['https://mail.google.com/'],
            CREDENTIALS_PATH: `./credentials/${emailAddress}/credentials.json`,
            TOKEN_PATH: `./credentials/${emailAddress}/token.json`,
            MAIL_OUTPUT_PATH: `./output/${emailAddress}`
        });        
    }
    
    async waitForEmail( emailAddress, subject ) {    
        
        await this.helpers['WebDriver'].grabCurrentUrl(); // ping web driver so session doesn't time out

        const recentMail = [];
        const simpleGoogleMail = this.getMailObject(emailAddress);
        const retrievedMail = await simpleGoogleMail.processRecentEmailWithCredentials();
        retrievedMail.forEach(element => recentMail.push(element) );        
        
        const foundMail = recentMail.filter( mail => mail.subject === subject )[0];  
        if( !foundMail ) assert.fail('No email found with subject: ' + subject);
        return foundMail;
    }

    async clearRecentMails( emailAddress ) {
        const simpleGoogleMail = this.getMailObject(emailAddress);
        return await simpleGoogleMail.processRecentEmailWithCredentials();
    }
}

module.exports = CustomEmailHelper;