FROM codeception/codeceptjs:2.3.0

LABEL MAINTAINER="emmonspired <dan.ryan.emmons@gmail.com>"

RUN mkdir /app && chown -R node:node . && chown -R node:node /app
COPY --chown=node:node package*.json /app/

WORKDIR /app
USER node
RUN npm install && npm cache clean --force

COPY --chown=node:node . /app/

ENTRYPOINT ["npx", "codeceptjs", "run", "--reporter", "mocha-multi", "--config", "config/codecept-jenkins.conf.js", "--grep"]
