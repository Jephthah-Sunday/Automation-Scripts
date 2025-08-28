@echo off
FOR /F "tokens=1,2 delims==" %%G IN ('findstr /V "#" .env') DO (
    SET %%G=%%H
)

k6 run performance-tests.js --out json=report.json
k6-html-reporter --json report.json --output report.html

echo Report generated: report.html
pause