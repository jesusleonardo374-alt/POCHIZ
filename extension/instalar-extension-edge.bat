@echo off
setlocal
title Instalar Asistente TOA en Edge

rem ====== CONFIGURA SOLO ESTAS DOS LINEAS ======
set "EXT_ID=ffkppahppjkmpienkpbfnkpkngcdkdko"
set "UPDATE_URL=https://jesusleonardo374-alt.github.io/POCHIZ/extension/update.xml"
rem =============================================

rem --- Pedir permisos de administrador si no los tiene ---
fsutil dirty query %systemdrive% >nul 2>&1
if errorlevel 1 (
  echo Solicitando permisos de administrador...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

echo %UPDATE_URL% | find "TU-USUARIO" >nul && (
  echo ERROR: primero edita este archivo y cambia UPDATE_URL por tu URL real.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$k='HKLM:\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallForcelist'; $v=$env:EXT_ID+';'+$env:UPDATE_URL; New-Item -Path $k -Force | Out-Null; $p=(Get-Item $k).Property; $ex=$p | Where-Object { (Get-ItemProperty $k).$_ -like ($env:EXT_ID+'*') } | Select-Object -First 1; if ($ex) { Set-ItemProperty -Path $k -Name $ex -Value $v } else { $n=1; while ($p -contains [string]$n) { $n++ }; New-ItemProperty -Path $k -Name ([string]$n) -Value $v -PropertyType String | Out-Null }"

if errorlevel 1 (
  echo No se pudo escribir la politica.
  pause
  exit /b 1
)

echo.
echo Listo. Politica instalada.
echo 1) Cierra TODAS las ventanas de Edge y vuelvelo a abrir.
echo 2) Comprueba en edge://policy (Recargar politicas) y edge://extensions.
echo.
pause
