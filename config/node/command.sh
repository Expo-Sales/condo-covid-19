#!/bin/sh

echo "Install node dependencies"
yarn install

echo "Install Migrates"
yarn sequelize db:migrate

echo "yarn run debug"
yarn debug

