
const Helper = codeceptjs.helper;
const assert = require('assert');
const recorder = codeceptjs.recorder;
const output = codeceptjs.output;

class CustomWebHelper extends Helper {

  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

  async pressKeys( text ) {    
    for( let i = 0; i < text.length; ++i ) {
      await this.helpers.WebDriver.pressKey(text.charAt(i));
    }
  }

  assertFullTextContainsSnippet(fullText, snippet, description = '') {
    //recorder.add(`say ${snippet}`, () => output.say(snippet, `white`));
    const fullTextString = fullText.toString();
    const snippetIncluded = fullTextString.includes(snippet);    
    assert(snippetIncluded, `${snippet} ${description}\n\nFull Text: ${fullTextString}`);
  }

}

module.exports = CustomWebHelper;
