#!/bin/sh

set -e

cd /home/ubuntu/wordpress/syntaxism-code-block-plugin
git fetch --all
git checkout master
git reset --hard origin/master
docker run --rm -it -v "$PWD":/app -w /app node:lts npm install
docker run --rm -it -v "$PWD":/app -w /app node:lts npm run build
