/// <reference path="../steps.d.ts" />

'use strict';

let Helper = codecept_helper;


class customClickHelper extends Helper {
    async tryToClick(string, object){
        try {
            return await this.helpers['WebDriver'].click(string, object); 
        } 
        catch (err){
            // do nothing
        }
    } 
}
module.exports = customClickHelper;