const { container, recorder } = require('codeceptjs');
const event = require('codeceptjs').event;

const readlineSync = require('readline-sync');

async function fetchData() {
  console.debug('process.argv:', process.argv[process.argv.length-1]);

  console.debug('environment-plugin: fetchData');
  // sets default environment if none has been provided via command line, .bash_profile or otherwise.
  process.env.QA_ENV = process.env.QA_ENV || 'dev'; // by default, dev environment. Set this first.
  process.env.QA_RESEMBLE_PREPARE_BASE_IMAGE = process.env.QA_RESEMBLE_PREPARE_BASE_IMAGE || 'false';
  process.env.QA_OVERRIDE_ENV_PROMPT = process.env.QA_OVERRIDE_ENV_PROMPT || 'false';

  console.log('QA_ENV:', process.env.QA_ENV);      
  console.log('QA_RESEMBLE_PREPARE_BASE_IMAGE', process.env.QA_RESEMBLE_PREPARE_BASE_IMAGE);
  console.log('QA_OVERRIDE_ENV_PROMPT', process.env.QA_OVERRIDE_ENV_PROMPT);  

  if( process.env.QA_OVERRIDE_ENV_PROMPT === 'false' 
    && process.env.QA_ENV !== 'dev' 
    && !readlineSync.keyInYNStrict(`Warning: QA_ENV=${process.env.QA_ENV}. Continue?`) ) {
    process.exit(1);
  }
    
  return process.env;
}

module.exports = function() {

  event.dispatcher.on(event.test.before, function (test) {      
    const WebDriver = container.helpers('WebDriver');
    const selenoidOptions = WebDriver.options.capabilities['selenoid:options'];

    if( selenoidOptions ) {
      selenoidOptions.name = test.title.replace(' ','_');
      selenoidOptions.videoName = test.title.replace(' ','_');
        
      if( test.tags.find( (tag) => tag === '@selenoid-long-session' ) ) {
        selenoidOptions.sessionTimeout = '3600s';
        console.log( `sessionTimeout: ${selenoidOptions.sessionTimeout}` );
      } else {
        delete selenoidOptions.sessionTimeout;
      }
    }
  });

  // event.dispatcher.on(event.test.after, function (test) {      
    // const WebDriver = container.helpers('WebDriver');
    // console.log('event.test.after: _stopBrowser');
    // WebDriver._stopBrowser();
  // });

 event.dispatcher.on(event.all.before, function () {
   recorder.startUnlessRunning(); // start recording promises
   recorder.add('loading data', async () => {
     // it's async function, return a promise
     const data = await fetchData();
     // add to container
     container.append({
       support: {
        EnvironmentData: data
       }
     })
   });
 });
}

// place this code in your node app, ideally in index.js or ./bin/www
// 
// you need this code so node will watch for exit signals
// node by default doesn't handle SIGINT/SIGTERM
// docker containers use SIGINT and SIGTERM to properly exit
//
// signals also aren't handeled by npm:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process, just a forced exit
//

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
		process.exit(1);
}
