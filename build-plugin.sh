#!/bin/bash

VERSION=$(jq -r ".version" package.json)

# TODO: add check package.json version and PHP plugin version match

# NOTE TO FUTURE SELF: 
# I copy each file individually to be sure only what I want goes in
# the plugin. For example a index.js.map file gets created during
# development which is not needed in production.

# make sure production build
npm run build

rm -rf dist/
mkdir -p dist/code-syntax-block/assets
mkdir -p dist/code-syntax-block/build
cp -r assets/prism dist/code-syntax-block/assets/
cp assets/blocks.style.css dist/code-syntax-block/assets
cp build/index.js dist/code-syntax-block/build/
cp build/index.asset.php dist/code-syntax-block/build/
cp index.php dist/code-syntax-block/
cp prism-languages.php dist/code-syntax-block/
cp readme.md dist/code-syntax-block/

cd dist
zip -r "code-syntax-block-$VERSION.zip" code-syntax-block
