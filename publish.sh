#!/bin/sh
set -e

# standard-version으로 버전 증가 및 커밋, 태그 생성
npx standard-version

# 커밋 및 태그 푸시
git push --follow-tags

# npm 배포
npm publish

echo "Successfully published."
