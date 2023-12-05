#!/bin/bash

set -e
CWD=$(pwd)
LOCAL_DEV_DIR=${CWD}/local

echo "\n--- Dev up of the monorepo, starting all backing services ---"

CWD=$(pwd)

if [ "$ENV" != "local" ]; then
  echo "Error: cannot run stop for non-local environment. Please set 'export ENV=local' in your shell configuration file"
  exit 1
fi

if [ "$1" = "reset" ]; then
  echo "Shutting down containers..."
  docker-compose -f ${LOCAL_DEV_DIR}/docker-compose.yml down

  echo "Cleaning up database/data..."

  rm -rf .tmp/
  echo "clean up docker"
  docker volume rm local_mongo || true
  docker volume rm local_platform_db || true
  exit 0
fi

echo "Stopping containers..."
docker-compose -f ${LOCAL_DEV_DIR}/docker-compose.yml stop
