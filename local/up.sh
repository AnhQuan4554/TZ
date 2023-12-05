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

echo "$GREEN --- Start with [${1-no parameters}] in working directory: $CWD"
echo "$GREEN --- Loading env vars from:   ${CWD}/local/.env $NC ---"
export $(cat ${CWD}/local/.env | xargs)

echo ""
echo "--- Dev up of the monorepo, starting all backing services ---"

echo 'other local development supported commands: ⬋'
echo "yarn $RED start:core $NC        ➙ run the backend database and core service"
echo "yarn $RED start:dev$NC          ➙ run fullstack include everything"
echo "yarn $RED start:dev --no-web$NC          ➙ Run all container except front-end and nginx"
echo "yarn $RED start:dev --web$NC          ➙ run the basic backend, platform api & client Api for web development"
echo "yarn $RED start:dev --worker$NC     ➙ Run platform/worker and admin web only"
echo "yarn $RED start:dev --guardian$NC     ➙ run the guardian stack and tymlez guardian api"
echo "yarn $RED start:dev --build$NC  ➙ Stop running container, delete node_modules volume , rebuild docker base image and start fullstack again"
echo "yarn $GREEN start:dev --restart$NC ➙ Restart all container"
echo "yarn $GREEN start:dev --local$NC ➙ Run basic project using host machine terminal"
echo "yarn $GREEN start:dev --reset-guardian$NC ➙ Reset mongodb and restart guardian services"
echo "yarn $GREEN start:dev --skaffold$NC ➙ Restart all container, run skaffold web and services"

GUARDIAN_CONTAINERS="guardian-guardian-service guardian-policy-service guardian-api-gateway guardian-frontend guardian-auth-service guardian-worker-service guardian-logger-service tymlez-guardian-api tymlez-guardian-extensions"

reset_guardian() {
    echo "Reset guardian database (mongo)"
    docker stop $GUARDIAN_CONTAINERS
    docker rm tymlez-dev-mongo --force
    docker volume rm local_mongo --force
}

echo "$GREEN --- Cleaning up temporary *.log and *.tsbuildinfo files"
yarn workspaces list | cut -d' ' -f3 | xargs -I {} sh -c "rm -f $CWD/{}/*.tsbuildinfo || true"
yarn workspaces list | cut -d' ' -f3 | xargs -I {} sh -c "rm -f $CWD/{}/*.log || true"

if [[ -z "${CLIENT_NAME}" ]]; then
    echo "$RED --- Error: cannot run start:dev without a CLIENT_NAME. Please set 'CLIENT_NAME' variable in local/.env file"
    exit
fi

LOCAL_SERVICES='mongo redis postgres localstack vault vault-setup'
CORE_SERVICES="$LOCAL_SERVICES tymlez-dev"
BACKEND_SERVICES="$CORE_SERVICES nginx nats-server platform-api platform-client-api"
WEB_SERVICES="$BACKEND_SERVICES  platform-admin-web platform-client-web platform-trustchain-web platform-report-web"
WORKER_SERVICES="$WEB_SERVICES platform-worker"
GUARDIAN_SERVICES="dozzle mongo mongo-express nats-server  vault vault-setup $GUARDIAN_CONTAINERS"
NO_WEB_SERVICES="$CORE_SERVICES $GUARDIAN_SERVICES platform-api  platform-client-api platform-worker"

START_SERVICES=''

if [ "$1" = "--no-web" ]; then
    echo "Starting core services..."
    START_SERVICES=$NO_WEB_SERVICES
fi

if [ "$1" = "--core" ]; then
    echo "Starting core services..."
    START_SERVICES=$CORE_SERVICES
fi

if [ "$1" = "--backend" ]; then
    echo "Starting backend services..."
    START_SERVICES=$WEB_SERVICES
fi

if [ "$1" = "--web" ]; then
    echo "Starting web services..."
    START_SERVICES=$WEB_SERVICES
fi

if [ "$1" = "--worker" ]; then
    echo "Starting web server and client services..."
    START_SERVICES=$WORKER_SERVICES
fi

if [ "$1" = "--guardian" ]; then
    echo "Starting guardian stack..."
    START_SERVICES=$GUARDIAN_SERVICES

    if [ "$2" = "--reset" ]; then
        reset_guardian
    fi
fi

if [ "$1" = "--skaffold" ]; then
    echo "Starting skaffold stack..."
    export SERVICE_PATH="skaffold"
    export CLIENT_NAME="client"
fi

docker_compose_stack=${CWD}/local/docker-compose.yml

export user_name=$(id -u -n)
export user_id=$(id -u)
export group_name=$(id -g -n)
export group_id=$(id -g)
export COMPOSE_HTTP_TIMEOUT=300
export CURRENT_UID=$(id -u):$(id -g)

if [ "$1" = "--build" ]; then
    echo "STOP containers and clean up node_modules volume"
    docker-compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env down
    docker volume rm local_platform_node_modules || true
    echo "REBUILD containers"
    docker-compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env build
else
    if [[ "$(docker images -q tymlez-development:latest 2>/dev/null)" == "" ]]; then
        echo "Build Docker image for tymlez-development container"
        docker-compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env build tymlez-dev
    fi
fi

if [ "$1" = "--restart" ]; then
    echo "Restart all containers"
    docker-compose -f $docker_compose_stack --env-file ${CWD}/local/docker.env restart
fi

if [ "$1" = "--local" ]; then
    echo "Run development in host terminal"
    START_SERVICES=$LOCAL_SERVICES
fi

if [ "$1" = "--reset-guardian" ]; then
    reset_guardian
fi

echo service to start $START_SERVICES
cat ${CWD}/local/docker.env ${CWD}/local/.env >${CWD}/local/local.env
export NEW_RELIC_LABELS="env:${CLIENT_NAME};client:local"
docker-compose -f $docker_compose_stack --env-file ${CWD}/local/local.env up -d $START_SERVICES
if [ "$(docker ps | grep -c postgres)" -ge 1 ]; then
    timeout 90s bash -c "until docker exec tymlez-dev-postgres pg_isready ; do sleep 5 ; done"
fi

docker-compose -f $docker_compose_stack logs -f --tail=100
