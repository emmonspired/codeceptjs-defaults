const { container, recorder, event } = require('codeceptjs');

const {SimpleGoogleSheets} = require('simple-google-sheets');

const sheets = new SimpleGoogleSheets({
  SCOPES:['https://www.googleapis.com/auth/spreadsheets'], 
  CREDENTIALS_PATH:`./credentials/codeceptjs.defaults@gmail.com/google-sheets-credentials.json`,
  TOKEN_PATH:`./credentials/codeceptjs.defaults/google-sheets-token.json`});

async function fetchData() {
  const QA_SHEET = '1NnD7LIP0Dt-EvZI6vrpnETeSISRRsB53UisaTIvg1GA';
  console.debug(`google-sheets-plugin: fetchData from ${QA_SHEET}`);

  const keyToRange = 
  [ {key:'qaSiteDefaults', range:'Site Defaults!A1:Z'},
    {key:'qaCreditCards', range: 'Credit Cards!A1:H'},
    {key:'qaTestAccounts', range: 'Staging Accounts!A1:H'},
    {key:'qaTestAccountReset', range: 'ResetAccounts!A1:L'},
    {key:'qaNewmanCollections', range: 'Newman-Collections!A1:D'},
    {key:'qaCoreAPIEnvironments', range: 'CoreAPI-Environments!A1:AZ'},
    {key:'qaCrawlerExclusions', range: 'Crawler-Exclusions!A1:C'},
    {key:'qaNewYorkRenewals', range: 'NY-AutoRenew!A1:Z'},
    {key:'qaZuoraSandbox', range: 'ZuoraSandbox!A1:Z'},
    {key:'qaSalesForceIDs', range: 'SF-IDS!A1:Z'} ];

  const promises = [];
  for( let entry of keyToRange ) { 
    promises.push( sheets.getRowsWithCredentials({spreadsheetId:QA_SHEET,range:entry.range}) );
  }
  
  let rawData = [];

  Promise.all(promises).then( (results) => {    
    for( let r in results ) {
      rawData[ keyToRange[r].key ] = results[r];
    }
  });

  return new GoogleSheetsDataWrapper(rawData);  
}

class GoogleSheetsDataWrapper {
  constructor(rawData) {    
    this.rawData = rawData;
  }

  getRawData() {
    return this.rawData;
  }

  toString() {
    return "-={ GoogleSheetsData }=-";
  }  
}

module.exports = function(config) {

 event.dispatcher.on(event.all.before, function () {
   recorder.startUnlessRunning(); // start recording promises
   recorder.add('loading data', async () => {
     // it's async function, return a promise
     const data = await fetchData();
     // add to container
     container.append({
       support: {
        GoogleSheetsData: data
       }
     })
   });
 });
}
