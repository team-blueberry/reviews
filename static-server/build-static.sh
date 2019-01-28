#!/usr/bin/env bash

# This script gathers files from the project's client/dist folder and
# compresses them to be bundled into a docker container and served with
# nginx. Files are precompressed to make use the nginx
# ngx_http_gzip_static_module.

script_dir=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $script_dir

rm ./static/*

cp ../client/dist/* ./static

gzip -k ./static/*