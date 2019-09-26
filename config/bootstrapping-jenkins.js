
const fs = require('fs');

module.exports = {
  bootstrapAll: function(done) {
    console.log('bootstrapAll called for multiple-browser tests only');    
    done();
  },
  teardownAll: function(done) {
    console.log('teardownAll called for multiple-browser tests only');
    done();
  },
  bootstrap: function(done) {    
    console.log('bootstrap before test suite');

    prepareDirectoriesForResembleHelper();        

    console.log('clearing ./output directory');      
    deleteFolderRecursive('./output', false);              
    done();
  },
  teardown: function(done) {    
    done();  
  },
}

var mkdirIfNotExits = function(path) {
  if( !fs.existsSync(path) ) {
    fs.mkdirSync(path);
  }
}

var deleteFolderRecursive = function(path, rmPath=true) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        if( !curPath.endsWith('.gitignore') ) {
          fs.unlinkSync(curPath);
        }
      }
    });
    if( rmPath ) fs.rmdirSync(path);
  }
};

var prepareDirectoriesForResembleHelper = function() {
  mkdirIfNotExits('./screenshots');
  mkdirIfNotExits('./screenshots/base');
  mkdirIfNotExits('./screenshots/diff');
}