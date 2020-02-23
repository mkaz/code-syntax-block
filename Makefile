# Customize Make
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.RECIPEPREFIX = >
# end

# NOTE TO OTHERS:
#
# You don't need to use this script, it is what I use to help me
# create a plugin zip file that I upload to Github releases.


# NOTE TO FUTURE SELF:
#
# I copy each file individually to be sure only what I want goes in
# the plugin. For example a index.js.map file gets created during
# development which is not needed in production.

# SVN repository update for wp.org uses Github actions

VERSION=$(jq -r ".version" package.json)

# TODO: add check package.json version and PHP plugin version match

# make sure production build
build:
> npm run build
.PHONY: build

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
> zip -r "code-syntax-block-${VERSION}.zip" code-syntax-block
.PHONY: zip
