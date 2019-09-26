curl -O --progress-bar --verbose https://download.docker.com/mac/stable/Docker.dmg | tee -a "${LOG_FILE}" ; test ${PIPESTATUS[0]} -eq 0 && open Docker.dmg
