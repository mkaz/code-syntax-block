#!/bin/sh

set -e

cd /home/ubuntu/wordpress/syntaxism-code-block-plugin
git checkout master
git fetch --all
git reset --hard origin/master
docker run --rm -it -v "$PWD":/app -w /app node:lts npm install
docker run --rm -it -v "$PWD":/app -w /app node:lts npm run build
