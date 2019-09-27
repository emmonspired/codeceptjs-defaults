const { container, recorder, event } = require('codeceptjs');

const {SimpleGoogleSheets} = require('simple-google-sheets');

const sheets = new SimpleGoogleSheets({
  SCOPES:['https://www.googleapis.com/auth/spreadsheets.readonly'], 
  CREDENTIALS_PATH:`./credentials/codeceptjs.defaults@gmail.com/google-sheets-credentials.json`,
  TOKEN_PATH:`./credentials/codeceptjs.defaults@gmail.com/google-sheets-token.json`});

async function fetchData() {
  const QA_SHEET = '12zKq7DzWE_WJJZHPrUHfEemC8SgZdfHs7EFNlOabdcs';
  console.debug(`google-sheets-plugin: fetchData from ${QA_SHEET}`);

  const keyToRange = 
  [ 
    {key:'qaSiteDefaults', range:'Site Defaults!A1:Z'},
  ];

  const promises = [];
  for( let entry of keyToRange ) { 
    promises.push( sheets.getRowsWithCredentials({spreadsheetId:QA_SHEET,range:entry.range}) );
  }
  
  let rawData = [];

  await (Promise.all(promises).then( (results) => {    
    for( let r in results ) {
      rawData[ keyToRange[r].key ] = results[r];
    }
  }));

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
