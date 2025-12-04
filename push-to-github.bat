@echo off
cd /d "C:\Users\jonig\OneDrive\Documentos\rpg-texto-dg"

echo ============================================
echo RPG TEXTO DG - PUSH PARA GITHUB
echo ============================================
echo.

echo [1/6] Inicializando repositorio Git...
git init

echo.
echo [2/6] Adicionando todos os arquivos...
git add .

echo.
echo [3/6] Criando commit inicial...
git commit -m "Initial commit: RPG Texto DG completo com sistema de profissoes, crafting, inventory e database modular"

echo.
echo [4/6] Adicionando repositorio remoto...
git remote remove origin 2>nul
git remote add origin https://github.com/JoniGuerini/rpg-texto.git

echo.
echo [5/6] Renomeando branch para main...
git branch -M main

echo.
echo [6/6] Fazendo push para GitHub...
git push -u origin main --force

echo.
echo ============================================
echo CONCLUIDO!
echo ============================================
echo.
echo Acesse: https://github.com/JoniGuerini/rpg-texto
echo.
pause

