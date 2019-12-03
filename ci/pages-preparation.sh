#!/usr/bin/env bash

echo 'Deleting the existing "public" directory'
rm -rf public

echo 'Copying the "build" directory to "public"'
cp -r build public

# Replaces a placeholder in the build output with a string value
populate_placeholder() {
  echo "  - Replacing all occurrences of '$1' with '$2'"
  grep -rl $1 public | xargs sed -i'.original' -e "s~$1~$2~g"
}

echo 'Injecting variables into the build output'
populate_placeholder '%%%GITLAB_CI_TIMESTAMP%%%' `date -u +'%Y-%m-%dT%H:%M:%SZ'`
populate_placeholder '%%%CI_COMMIT_SHORT_SHA%%%' $CI_COMMIT_SHORT_SHA
populate_placeholder '%%%CI_PROJECT_URL%%%' $CI_PROJECT_URL
