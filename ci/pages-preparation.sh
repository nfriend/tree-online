#!/usr/bin/env bash

# Remove the existing "public" directory to avoid conflicts
rm -rf public

# Copy the "build" directory to "public" for GitLab Pages
cp -r build public

# Get a timestamp that looks like 2019-12-03T13:08:42Z
timestamp=`date -u +'%Y-%m-%dT%H:%M:%SZ'`

# Stamp the build output with the current timestamp
sed -i'.original' -e "s/%%%GITLAB_CI_TIMESTAMP%%%/$timestamp/g" public/*.js
