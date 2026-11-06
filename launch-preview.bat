@echo off
echo ========================================================
echo   CODENEXA TECHNOLOGIES - 3D Web Platform
echo ========================================================
echo Starting local development server...
start "" "http://localhost:8080"
python -m http.server 8080
pause
