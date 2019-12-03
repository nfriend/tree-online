#!/usr/bin/env bash

# Remove the existing "public" directory to avoid conflicts
rm -rf public

# Copy the "build" directory to "public" for GitLab Pages
cp -r build public

# The text in the build output that will be replaced with the timestamp
replacement='%%%GITLAB_CI_TIMESTAMP%%%'

# Get a timestamp that looks like 2019-12-03T13:08:42Z
timestamp=`date -u +'%Y-%m-%dT%H:%M:%SZ'`

# Stamp the build output with the current timestamp
grep -rl $replacement public | xargs sed -i'.original' -e "s/$replacement/$timestamp/g"
