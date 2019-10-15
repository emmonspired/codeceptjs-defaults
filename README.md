## Setup (Install Java, GitKraken, Node, node_modules, selenium-standalone, etc)
Learn more at http://codecept.io/

1. Install Java JDK: https://www.oracle.com/technetwork/java/javase/downloads/index.html
2. Download GitKraken: https://www.gitkraken.com/download/mac
  a. Sign in with your github account
  b. Create a "code" folder on your /Users/*YOURCOMPUTERUSERNAME*/ folder
  c. Clone the QA repo to your /code/ folder
3. Open terminal and CD to the new QA folder that was created from the cloning process
4. ./sanity-check.sh    

## Alternative Setup with Docker & Git
1. ./config/install-docker.sh
2. ./config/install-selenoid.sh
3. ./dj @SanityCheck

## Creating A test

  ```Termainal
  ./cc gt
  ```

## Running Tests

### Browser Mode. Selenium Standalone is started while Codecept Bootstraps

  ```Termainal
  ./qa @SomeTagGoesHere
  ```
### Headless Mode. Selenium Standalone is started while Codecept Bootstraps

  ```Termainal
  ./api-qa @SomeTagGoesHere
  ```
### Docker Mode. selenenoid / selenoid-ui used. Simulates what "docker jenkins" does.

  ```Termainal
  ./dj @SomeTagGoesHere
  ```

## Generating CodeceptJS TypeScript Type Definitions

This should be run any time the custom helpers in `./helpers` change:

```
./node_modules/codeceptjs/bin/codecept.js def
```

## Enabling Google Sheets API
https://developers.google.com/sheets/api/quickstart/nodejs
