#!/bin/bash
# Load variables from .env
export $(grep -v '^#' .env | xargs)

k6 run performance-tests.js --out json=report.json
k6-html-reporter --json report.json --output report.html

echo "✅ Report generated: report.html"