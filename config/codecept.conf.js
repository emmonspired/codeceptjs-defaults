/* eslint-disable import/extensions */
/* eslint-disable global-require */
exports.config = {
  tests: '../tests/**/*.spec.js',
  output: '../output',
  timeout: 1800000,
  helpers: {
    REST: {
      timeout: 30000,
    },
    CustomWindowHelper: {
      require: '../helpers/custom-window-helper.js', // I.getWindowHandle(...);
    },
    CustomRESTHelper: {
      require: '../helpers/custom-rest-helper.js', // I.checkGetRequest
    },
    CustomWebHelper: {
      require: '../helpers/custom-web-helper.js', // I.pressKeys
    },
    CustomEmailHelper: {
      require: '../helpers/custom-email-helper.js', // I.checkGetRequest
    },
    CustomClickHelper: {
      require: '../helpers/custom-click-helper.js',
    },
    CustomEraseFieldHelper: {
      require: '../helpers/custom-erase-field-helper.js',
    },
    /* ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder : './output/',
      baseFolder: './screenshots/base/',
      diffFolder: './screenshots/diff/'
    }, */
    FileSystem: {},
    WebDriver: {
      url: 'https://www.google.com',
      browser: 'chrome',
      smartWait: 5000,
      capabilities: {
        chromeOptions: {
          args: ['--disable-gpu', '--window-size=1900,1200', '--incognito'],
        },
      },
    },
  },
  multiple: {
    parallel: {
      chunks: 1,
      browsers: ['chrome', 'firefox', 'safari'],
    },
  },
  include: {
    I: './steps_file.js',
    homePage: '../pages/home-page/home-page.js',
    loginPage: '../pages/login-page/login-page.js',
    signUpPage: '../pages/sign-up-page/sign-up-page.js',
    protectorAcademypPage: '../pages/protector-academy-page/protector-academy-page.js',
    protectorAcademyVideosPage: '../pages/protector-academy-videos-page/protector-academy-videos-page.js',
    usccaDashboardPage: '../pages/uscca-dashboard-page/uscca-dashboard-page.js',
    userAccountDetailsPage: '../pages/user-account-details-page/user-account-details-page.js',
    userAccountMenu: '../pages/user-account-menu/user-account-menu.js',
    testData: '../credentials/test-data.js',
  },
  bootstrapAll: require('./bootstrapping.js'),
  teardownAll: require('./bootstrapping.js'),
  bootstrap: require('./bootstrapping.js'),
  teardown: require('./bootstrapping.js'),
  mocha: {},
  name: 'QA',
  plugins: {
    'environment-plugin': {
      require: './environment-plugin.js',
      enabled: true,
    },
  },

};
