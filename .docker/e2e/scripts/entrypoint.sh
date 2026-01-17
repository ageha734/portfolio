#!/bin/bash
set -eux -o pipefail

WORK_DIR="${WORK_DIR:-/work}"
REPORT_DIR="${REPORT_DIR:-/work/docs/security/e2e}"
SKIP_BUILD="${SKIP_BUILD:-false}"
SKIP_SECURITY_SCAN="${SKIP_SECURITY_SCAN:-false}"

echo "🚀 Starting E2E test execution with security scanning"
echo "Work directory: ${WORK_DIR}"
echo "Report directory: ${REPORT_DIR}"
echo "Skip build: ${SKIP_BUILD}"
echo "Skip security scan: ${SKIP_SECURITY_SCAN}"

if [ "${SKIP_BUILD}" != "true" ]; then
    echo ""
    echo "📦 Step 1: Building application..."
    cd "${WORK_DIR}" || exit 1

    if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/bun" ]; then
        echo "Installing dependencies..."
        bun install --frozen-lockfile || {
            echo "❌ Error: Failed to install dependencies" >&2
            exit 1
        }
    fi

    echo "Building application..."
    bun run build || {
        echo "❌ Error: Application build failed" >&2
        exit 1
    }
    echo "✅ Build completed successfully"
else
    echo ""
    echo "⏭️  Skipping build (SKIP_BUILD=true)"
fi

if [ "${SKIP_SECURITY_SCAN}" != "true" ]; then
    echo ""
    echo "🔒 Step 2: Running security scan on application code..."

    mkdir -p "${REPORT_DIR}"

    if command -v trivy &> /dev/null; then
        echo "Running Trivy filesystem scan..."
        trivy filesystem \
            --format json \
            --output "${REPORT_DIR}/trivy-fs-report.json" \
            --severity HIGH,CRITICAL \
            --exit-code 0 \
            "${WORK_DIR}" || true

        trivy filesystem \
            --format table \
            --output "${REPORT_DIR}/trivy-fs-report.txt" \
            --severity HIGH,CRITICAL \
            --exit-code 0 \
            "${WORK_DIR}" || true
    else
        echo "⚠️  Trivy is not installed in the container"
    fi

    echo "Running dependency vulnerability scan..."
    cd "${WORK_DIR}" || exit 1
    bun audit --json > "${REPORT_DIR}/bun-audit-report.json" 2>&1 || true
    bun audit > "${REPORT_DIR}/bun-audit-report.txt" 2>&1 || true

    if [ -f "${REPORT_DIR}/bun-audit-report.json" ]; then
        CRITICAL_COUNT=$(grep -ic "critical" "${REPORT_DIR}/bun-audit-report.json" || echo "0")
        if [ "${CRITICAL_COUNT}" -gt 0 ]; then
            echo "⚠️  WARNING: Found ${CRITICAL_COUNT} CRITICAL vulnerabilities in dependencies"
            echo "   Review the report at: ${REPORT_DIR}/bun-audit-report.txt"
        fi
    fi
    echo "✅ Security scan completed"
else
    echo ""
    echo "⏭️  Skipping security scan (SKIP_SECURITY_SCAN=true)"
fi

echo ""
echo "🧪 Step 3: Running E2E tests..."
cd "${WORK_DIR}" || exit 1

if [ $# -eq 0 ]; then
    echo "Running default E2E tests..."
    exec bunx playwright test
else
    echo "Running custom command: $*"
    exec "$@"
fi
