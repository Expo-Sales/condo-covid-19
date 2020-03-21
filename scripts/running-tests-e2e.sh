#!/bin/bash
cd /tmp/seed/source/src
yarn debug &
yarn test-e2e
