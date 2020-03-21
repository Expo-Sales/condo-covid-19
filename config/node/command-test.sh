#!/bin/sh

echo "Install node dependencies"
yarn install

echo "Up graphql"
yarn testall-up-graphql

echo "Waiting to go up graphql API"
sleep 15s

echo "yarn run all tests"
yarn testall