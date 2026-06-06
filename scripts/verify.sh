#!/usr/bin/env sh
# verify.sh
# "완료의 정의"를 코드로 표현한 파일.
# Claude Code의 Stop hook 또는 CI에서 호출.
# 한 단계라도 실패하면 즉시 멈춘다.
# (Expo 앱이라 별도 build 단계 없음 — type-check + lint로 검증)

set -e

echo "[verify 1/2] type-check..."
npm run type-check

echo "[verify 2/2] lint..."
npm run lint

echo ""
echo "[verify] OK — 모든 검증 통과"
