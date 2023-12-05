#!/bin/bash
export ENV=local
RED="\033[0;31m"
NC="\033[0m" # No Color
GREEN='\033[0;32m'
processor=$(arch)

if [ $processor == 'i386' ]; then
    if ! ascii-image-converter -v &>/dev/null; then
        # https://github.com/TheZoraiz/ascii-image-converter#cli-usage
        brew install TheZoraiz/ascii-image-converter/ascii-image-converter
    fi

    ascii-image-converter local/tymlez.png -C -b --threshold 50 --dither -f
fi

set -e
CWD=$(pwd)
echo "Working dir $CWD"
echo "$RED --- LOADING SECRETS VARs FROM:   ${CWD}/local/.env $NC ---"
export $(cat ${CWD}/local/.env | xargs)

echo ""

docker_compose_stack=${CWD}/local/docker-compose.yml
echo "STOP containers and clean up node_modules volume"
docker compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env down
docker volume rm local_platform_node_modules || true
echo "REBUILD containers"
docker compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env build
