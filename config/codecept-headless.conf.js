exports.config = {
  tests: '../tests/**/*.js',
  output: '../output',
  helpers: {
    REST : {
      timeout: 30000
    },
    EnvironmentHelper: {
      require: '../helpers/environment-helper.js' // I.grabCreditCard(...); 
    },
    CustomRESTHelper: {
      require: '../helpers/custom-rest-helper.js' // I.checkGetRequest
    },
    CustomWebHelper: {
      require: '../helpers/custom-web-helper.js' // I.pressKeys
    },
    CustomEmailHelper: {
      require: '../helpers/custom-email-helper.js' 
    },
    CustomClickHelper: {
      require: '../helpers/custom-click-helper.js'
    },    
    FileSystem : {},
    WebDriver: {
      restart: false,
      url: 'https://www.google.com/',
      browser: 'chrome',      
      capabilities: {        
        chromeOptions: {
          args: [ "--headless", "--disable-gpu", "--window-size=1900,1200"]
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
  },
  "mocha": {
    "reporterOptions": {
      "codeceptjs-cli-reporter": {
        "stdout": "-",
        "options": {
          "verbose": false,
          "steps": true,
        }
      },
      "mochawesome": {
       "stdout": "./output/console.log",
       "options": {
         "reportDir": "./output",
         "reportFilename": "index"
       }
      },
      "mocha-junit-reporter": {
        "stdout": "./output/console.log",
        "options": {
          "mochaFile": "./output/result.xml"
        },
        "attachments": true //add screenshot for a failed test
      }
    }
  }

}
