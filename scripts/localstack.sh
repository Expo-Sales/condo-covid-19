#!/bin/bash
echo "Atualiza versao do Pip"
pip install --upgrade pip

echo "Instala o LocalStack"
pip install localstack

echo "Running Localstack with Docker"
docker run -d -e LOCALSTACK_HOSTNAME="localhost" -e DEFAULT_REGION="us-east-1" -e TEST_AWS_ACCOUNT_ID="000000000000" -e LOCALSTACK_HOSTNAME="localhost" -e LOCALSTACK_API_KEY="4d5e8d5a" --rm --privileged --name localstack_main -p 8080:8080 -p 8081:8081  -p 443:443 -p 4567-4608:4567-4608  -v "/tmp/localstack:/tmp/localstack" -v "/var/run/docker.sock:/var/run/docker.sock" -e DOCKER_HOST="unix:///var/run/docker.sock" -e HOST_TMP_FOLDER="/tmp/localstack" "localstack/localstack"

echo "Subindo container postgres"
docker-compose -f docker-compose.postgres.yml up -d

echo "Listando containers"
docker ps

#localstack start --docker
echo "End"
