# Docker & Compose are Prerequisites
docker --version && docker-compose --version
# Stop and Remove any existing Selenoid containers
docker stop selenoid && docker rm selenoid && docker stop selenoid-ui && docker rm selenoid-ui
# Get CM (Confifuration Manager)
curl -s https://aerokube.com/cm/bash | bash
# Install the updated versions of selenoid and selenoid-ui
./cm selenoid update && ./cm selenoid-ui update -p 7777
# Run the QA suite - See the Web Browser Session in selenoid-ui
echo "about to run tests..." && sleep 2 && open "http://localhost:7777" && ./dj @SanityCheck && echo "about to shut down selenoid..." && sleep 2
# Stop and Remove the selenoid containers
docker stop selenoid && docker rm selenoid && docker stop selenoid-ui && docker rm selenoid-ui