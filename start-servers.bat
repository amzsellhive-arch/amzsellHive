@echo off
REM ============================================================
REM  SellHive - Start Backend (Laravel) + Frontend (Vite)
REM  Usage: double-click this file, or run from Command Prompt.
REM ============================================================
setlocal
title SellHive Dev Servers

REM Use XAMPP PHP if php is not on the system PATH
set PHP_EXE=php
where php >nul 2>nul
if errorlevel 1 set PHP_EXE=C:\xampp\php\php.exe

echo [1/2] Starting Laravel backend on http://localhost:8000 ...
start "SellHive Backend" /D "%~dp0backend" "%PHP_EXE%" artisan serve --port=8000

echo [2/2] Starting React frontend on http://localhost:5173 ...
start "SellHive Frontend" /D "%~dp0frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo   Backend : http://localhost:8000
echo   Frontend: http://localhost:5173
echo.
echo Close the two new windows to stop the servers.
pause
endlocal

