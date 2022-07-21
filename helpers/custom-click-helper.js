/// <reference path="../steps.d.ts" />
'use strict';

let Helper = codecept_helper;

class customClickHelper extends Helper {
  tryToClick(string) {
    return this.helpers['WebDriver'].grabAllContexts(string, object);
  }
}
module.exports = customClickHelper;
