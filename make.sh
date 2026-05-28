#!/bin/bash
# Usage:
#   ./make.sh
#   ./make.sh server
#   PORT=1313 ./make.sh server

set -euo pipefail
set -x

if [ -f ".local-env" ]; then
    set -a
    . ./.local-env
    set +a
fi

if [ "${SKIP_PREGEN:-}" = "" ]; then
    npm --prefix generator --verbose install
    node generator/main.js
fi

cmd=(hugo "$@")

if [ "${1:-}" = "server" ]; then
    cmd+=(--bind "${BIND:-0.0.0.0}")
    if [ "${PORT:-}" != "" ]; then
        cmd+=(--port "$PORT")
    fi
fi

exec "${cmd[@]}"
