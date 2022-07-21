#!/bin/sh

QA_STARTTIME=$(date +%s)

clean_up() {
	# Perform program exit housekeeping
    echo "\ndocker stop ${CONTAINER_NAME}"
	docker stop $CONTAINER_NAME
	exit
}

trap clean_up SIGINT SIGTERM

if [ -z "$CONTAINER_NAME" ]; then	
    CONTAINER_NAME="qa_codecept_$((`head -c 1 /dev/urandom | od -An -t u1`))"
    echo "CONTAINER_NAME unset. Assigned CONTAINER_NAME=${CONTAINER_NAME}"
else 
    echo "CONTAINER_NAME set to ${CONTAINER_NAME}"
    echo "To automatically assign CONTAINER_NAME with qa_codecept_$RANDOM, then unset CONTAINER_NAME."
fi

case "$OSTYPE" in
  darwin*)  export QA_INTERACTIVE_TERMINAL="-i" ;; 
esac

{ # try
docker build -t qa .

./config/selenoid-check.sh

docker run $QA_INTERACTIVE_TERMINAL -t \
 -e QA_ENV=$QA_ENV -e QA_OVERRIDE_ENV_PROMPT=true -e QA_CRAWL_N_LEVELS=$QA_CRAWL_N_LEVELS \
 -v $PWD/output:/app/output -v $PWD/tests:/app/tests -v $PWD/pages:/app/pages \
 -u 111 --link selenoid --name $CONTAINER_NAME --rm qa $*  
} || { #catch
 echo 'Error with run. Inspect saved screenshots in ./output'
} 

# finally 
QA_ENDTIME=$(date +%s)
echo "It took $(($QA_ENDTIME - $QA_STARTTIME)) seconds to complete."

echo 'Tests were run with command:'
echo docker run -t -e QA_ENV=$QA_ENV -e QA_OVERRIDE_ENV_PROMPT=true -v $PWD/output:/app/output -v $PWD/tests:/app/tests -v $PWD/pages:/app/pages -u 111 --link selenoid --name $CONTAINER_NAME --rm qa $* 
