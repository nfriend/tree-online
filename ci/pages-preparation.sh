#!/usr/bin/env bash

echo 'Deleting the existing "public" directory...'
rm -rf public

echo 'Copying the "build" directory to "public"...'
cp -r build public

# Replaces a placeholder in the build output with a string value
populate_placeholder() {
  echo "  - Replacing all occurrences of '$1' with '$2'..."
  grep -rl $1 public | xargs sed -i'.original' -e "s~$1~$2~g"
}

echo 'Injecting variables into the build output...'
populate_placeholder '%%%GITLAB_CI_TIMESTAMP%%%' `date -u +'%Y-%m-%dT%H:%M:%SZ'`
populate_placeholder '%%%CI_COMMIT_SHORT_SHA%%%' $CI_COMMIT_SHORT_SHA
populate_placeholder '%%%CI_PROJECT_URL%%%' $CI_PROJECT_URL

# Run gzip on the output and create a .gz version of each relevant file
# Based on https://webmasters.stackexchange.com/a/119671
echo "Creating a gzip'd version of each of the relevant static files..."
find public \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' \) -print0 \
  | xargs -0 gzip --best --keep --verbose
