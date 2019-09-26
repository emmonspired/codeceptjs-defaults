exports.config = {
  tests: '../tests/**/*.js',
  output: '../output',
  timeout: 1800000,
  helpers: {
    REST : {
      timeout: 30000
    },
    EnvironmentHelper: {
      require: '../helpers/environment-helper.js' // I.grabCreditCard(...); 
    },
    CustomWindowHelper: {
      require: '../helpers/custom-window-helper.js' // I.getWindowHandle(...);
    },
    CustomRESTHelper: {
      require: '../helpers/custom-rest-helper.js' // I.checkGetRequest
    },
    CustomWebHelper: {
      require: '../helpers/custom-web-helper.js' // I.pressKeys
    },
    CustomEmailHelper: {
      require: '../helpers/custom-email-helper.js' // I.checkGetRequest
    },
    CustomClickHelper: {
      require: '../helpers/custom-click-helper.js'
    },
    /*ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder : './output/',
      baseFolder: './screenshots/base/',
      diffFolder: './screenshots/diff/'
    },*/
    FileSystem : {},
    WebDriver: {
      url: 'https://www.google.com',
      browser: 'chrome',      
      capabilities: {                
        chromeOptions: {
          args: [ /*"--headless", "--disable-gpu",*/ "--window-size=1900,1200" ],
        },        
      },
    },
  },
  multiple: {
    parallel: {
      chunks: 1,
      browsers: ['chrome', 
      'firefox', 
      'safari'
    ]
    },
  },
  include: {
    I: './steps_file.js'
  },
  bootstrapAll: "./bootstrapping.js",
  teardownAll: "./bootstrapping.js",
  bootstrap: "./bootstrapping.js",
  teardown: "./bootstrapping.js",
  mocha: {},
  name: 'QA',
  plugins: {
    "sheets-plugin": {
      "require": "./google-sheets-plugin.js",
      "enabled": true
    },
    "environment-plugin": {
      "require": "./environment-plugin.js",
      "enabled": true
    }
  }
}
