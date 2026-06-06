# verify.ps1
# Windows PowerShell 환경용 검증 스크립트.
# verify.sh와 동일한 역할.
# (Expo 앱이라 별도 build 단계 없음 — type-check + lint로 검증)

$ErrorActionPreference = "Stop"

Write-Host "[verify 1/2] type-check..."
npm run type-check
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "[verify 2/2] lint..."
npm run lint
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "[verify] OK - 모든 검증 통과"
