# Customize Make
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.RECIPEPREFIX = >
# end

# NOTE TO OTHERS:
# You don't need to use this script, it is what I use to help me
# 1. create a plugin zip file that I upload to Github releases.
# 2. update SVN files that I upload to WordPress Plugin directory

# You can install the plugin from there

# NOTE TO FUTURE SELF: 
# I copy each file individually to be sure only what I want goes in
# the plugin. For example a index.js.map file gets created during
# development which is not needed in production.

VERSION=$(jq -r ".version" package.json)

# TODO: add check package.json version and PHP plugin version match

# make sure production build
build:
> npm run build
.PHONY: build

svn: build
> echo "Copying files to SVN directory"
> rm -rf svn/trunk/assets/prism
> cp -r assets/prism svn/trunk/assets/
> cp assets/blocks.style.css svn/trunk/assets/
> cp build/index.js svn/trunk/build/
> cp build/index.asset.php svn/trunk/build/
> cp index.php svn/trunk/
> cp prism-languages.php svn/trunk/
.PHONY: svn

zip: build
> echo "Building zip in dist/"
> rm -rf dist/
> mkdir -p dist/code-syntax-block/assets
> mkdir -p dist/code-syntax-block/build
> cp -r assets/prism dist/code-syntax-block/assets/
> cp assets/blocks.style.css dist/code-syntax-block/assets
> cp build/index.js dist/code-syntax-block/build/
> cp build/index.asset.php dist/code-syntax-block/build/
> cp index.php dist/code-syntax-block/
> cp prism-languages.php dist/code-syntax-block/
> cp readme.md dist/code-syntax-block/
> cd dist
> zip -r "code-syntax-block-$(VERSION).zip" code-syntax-block
.PHONY: zip
