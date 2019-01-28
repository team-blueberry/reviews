#!/usr/bin/env bash

# This script gathers files from the project's client/dist folder and
# compresses them to be bundled into a docker container and served with
# nginx. Files are precompressed to make use the nginx
# ngx_http_gzip_static_module.

# Run script relative to current directory
script_dir=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd $script_dir

# Create webpack production build
webpack -p

# Clear previously served files
rm ./static/*

cp ../client/dist/* ./static

# Minify CSS
uglifycss ../client/dist/styles.css > static/styles.css

# Run gzip at max compression level and keep original files
gzip -k --best ./static/*