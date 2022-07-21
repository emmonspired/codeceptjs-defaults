const fs = require('fs');
const selenium = require('selenium-standalone');
const { exec } = require('child_process');

async function bootstrapAll() {
  console.log('bootstrapAll called for multiple-browser tests only');

  prepareDirectoriesForResembleHelper();

  console.log('stopping zombie selenium processes before restarting selenium');
  // https://www.npmjs.com/package/selenium-standalone
  exec('pkill -f selenium-standalone', () => {
    console.log('starting selenium');
    selenium.start(() => {
      console.log('selenium started.');
      console.log('clearing ./output directory');
      deleteFolderRecursive('./output', false);
    });
  });
}
async function teardownAll() {
  console.log('teardownAll called for multiple-browser tests only');
  console.log('stopping selenium');
  exec('pkill -f selenium-standalone'); // https://www.npmjs.com/package/selenium-standalone
}
async function bootstrap() {
  console.log('bootstrap before test suite');
}
async function teardown() {
  console.log('teardown after test suite');
}

const mkdirIfNotExits = function (path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

var deleteFolderRecursive = function (path, rmPath = true) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        if (!curPath.endsWith('.gitignore')) {
          fs.unlinkSync(curPath);
        }
      }
    });
    if (rmPath) fs.rmdirSync(path);
  }
};

var prepareDirectoriesForResembleHelper = function () {
  mkdirIfNotExits('./screenshots');
  mkdirIfNotExits('./screenshots/base');
  mkdirIfNotExits('./screenshots/diff');
};

(module.exports = bootstrapAll), teardownAll, bootstrap, teardown;
