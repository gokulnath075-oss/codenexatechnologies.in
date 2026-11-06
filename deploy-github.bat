@echo off
echo ========================================================
echo  CODENEXA TECHNOLOGIES - GitHub Pages Deployment Helper
echo ========================================================
echo.

git status

echo.
set /p commitMsg="Enter commit message (or press ENTER for default): "
if "%commitMsg%"=="" set commitMsg="Update Codenexa Technologies web platform"

echo.
echo Staging and committing changes...
git add .
git commit -m "%commitMsg%"

echo.
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================================
echo  Deployment complete! Check https://codenexatechnologies.in
echo ========================================================
pause
