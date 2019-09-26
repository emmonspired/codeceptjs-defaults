#!/bin/bash

if docker ps | grep selenoid > /dev/null
then
  echo "selenoid is running..."
else
  echo "starting selenoid..."
  docker rm selenoid-ui selenoid
  docker-compose -f docker-compose-selenoid.yml up -d selenoid
  echo "wait 3 seconds..." 
  sleep 3  
  docker-compose -f docker-compose-selenoid.yml up -d selenoid-ui
fi
