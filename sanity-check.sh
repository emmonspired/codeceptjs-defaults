#!/bin/bash

if which node > /dev/null
then
  echo "node is installed, skipping..."
else
  echo "node needs to be installed."
  curl -sSL https://nodejs.org/dist/v12.9.1/node-v12.9.1.pkg -o node-v12.9.1.pkg 
  sudo installer -store -pkg ./node-v12.9.1.pkg -target "/"
  node -v
  rm node-v12.9.1.pkg 
fi

rm -rf node_modules && \
 npm install && \
 ./node_modules/.bin/selenium-standalone install && \
 ./api-qa @SanityCheck
