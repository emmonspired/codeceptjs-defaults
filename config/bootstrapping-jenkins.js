const fs = require('fs');

module.exports = {
  bootstrapAll: async () => {
    console.log('bootstrapAll called for multiple-browser tests only');
  },
  teardownAll: async () => {
    console.log('teardownAll called for multiple-browser tests only');
  },
  bootstrap: async () => {
    console.log('bootstrap before test suite');

    prepareDirectoriesForResembleHelper();

    console.log('clearing ./output directory');
    deleteFolderRecursive('./output', false);
  },
  teardown: async () => {},
};

const mkdirIfNotExits = function (path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

let deleteFolderRecursive = function (path, rmPath = true) {
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

let prepareDirectoriesForResembleHelper = function () {
  mkdirIfNotExits('./screenshots');
  mkdirIfNotExits('./screenshots/base');
  mkdirIfNotExits('./screenshots/diff');
};
