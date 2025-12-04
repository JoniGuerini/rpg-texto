@echo off
cd /d "C:\Users\jonig\OneDrive\Documentos\rpg-texto-dg"

echo ============================================
echo RPG TEXTO DG - DEPLOY GITHUB PAGES
echo ============================================
echo.

echo [1/4] Buildando projeto...
call npm run build

echo.
echo [2/4] Commitando alteracoes...
git add .
git commit -m "chore: configurar GitHub Pages"

echo.
echo [3/4] Fazendo push...
git push

echo.
echo [4/4] Deploy sera feito automaticamente pelo GitHub Actions!
echo.
echo ============================================
echo CONCLUIDO!
echo ============================================
echo.
echo Aguarde ~2 minutos para o deploy completar.
echo Depois acesse: https://joniguerini.github.io/rpg-texto/
echo.
pause

