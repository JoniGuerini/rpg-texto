@echo off
cd /d "%~dp0"

echo ============================================
echo RPG TEXTO DG - DEPLOY MANUAL (SEM ACTIONS)
echo ============================================
echo.

echo [1/7] Limpando build anterior...
if exist dist rmdir /s /q dist

echo.
echo [2/7] Instalando dependencias...
call npm install

echo.
echo [3/7] Fazendo build do projeto...
call npm run build
if errorlevel 1 (
    echo ERRO no build!
    pause
    exit /b 1
)

echo.
echo [4/7] Entrando na pasta dist...
cd dist

echo.
echo [5/7] Inicializando Git na pasta dist...
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy: %date% %time%"
if errorlevel 1 (
    echo ERRO no commit!
    cd ..
    pause
    exit /b 1
)

echo.
echo [6/7] Fazendo push para branch gh-pages...
git remote add origin https://github.com/JoniGuerini/rpg-texto.git
git push -f origin gh-pages

echo.
echo [7/7] Limpando...
cd ..

echo.
echo ============================================
echo DEPLOY CONCLUIDO!
echo ============================================
echo.
echo Acesse em ~2-3 minutos: https://joniguerini.github.io/rpg-texto/
echo.
echo IMPORTANTE: Se for a primeira vez, configure GitHub Pages:
echo 1. Va em: https://github.com/JoniGuerini/rpg-texto/settings/pages
echo 2. Source: Deploy from a branch
echo 3. Branch: gh-pages / (root)
echo 4. Clique em Save
echo.
pause

