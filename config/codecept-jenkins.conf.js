/* eslint-disable import/extensions */
/* eslint-disable global-require */
exports.config = {
  tests: '../tests/**/*.js',
  output: '../output',
  timeout: 1800000,
  helpers: {
    REST: {
      timeout: 30000,
    },
    CustomRESTHelper: {
      require: '../helpers/custom-rest-helper.js', // I.checkGetRequest
    },
    CustomWebHelper: {
      require: '../helpers/custom-web-helper.js', // I.pressKeys
    },
    CustomEmailHelper: {
      require: '../helpers/custom-email-helper.js',
    },
    CustomClickHelper: {
      require: '../helpers/custom-click-helper.js',
    },
    FileSystem: {},
    WebDriver: {
      restart: false,
      host: 'selenoid',
      url: 'https://www.google.com/',
      browser: 'chrome',
      smartWait: 5000,
      capabilities: {
        chromeOptions: {
          args: ['--window-size=1900,1200', '--disable-blink-features=AutomationControlled'],
        },
        selenoidOptions: {
          enableVNC: true,
          name: process.argv[process.argv.length - 1],
          videoName: process.argv[process.argv.length - 1],
          // enableVideo: true
        },
      },
      timeouts: {
        script: 1800000,
        'page load': 1800000,
        pageLoad: 1800000,
        implicit: 5000,
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
  bootstrapAll: require('./bootstrapping-run-workers.js'),
  teardownAll: require('./bootstrapping-run-workers.js'),
  bootstrap: require('./bootstrapping-run-workers.js'),
  teardown: require('./bootstrapping-run-workers.js'),
  name: 'QA',
  plugins: {
    'environment-plugin': {
      require: './environment-plugin.js',
      enabled: true,
    },
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true,
        },
      },
      mochawesome: {
        stdout: './output/console.log',
        options: {
          reportDir: './output',
          reportFilename: 'index',
        },
      },
      'mocha-junit-reporter': {
        stdout: './output/console.log',
        options: {
          mochaFile: './output/result.xml',
        },
        attachments: true, // add screenshot for a failed test
      },
    },
  },
  reporter: 'mocha-multi',
};
