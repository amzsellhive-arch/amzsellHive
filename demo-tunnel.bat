@echo off
REM ============================================================
REM  SellHive - Cloudflare Tunnel DEMO Setup (Safe Edition)
REM  ------------------------------------------------------------
REM  Ye script aapki WEBSITE/CODE ko KABHI TOUCH NAHI KARTI.
REM  Sirf ye 3 cheezein karta hai:
REM    1. Backend (Laravel) ko localhost:8000 par start karta hai
REM    2. Frontend (React) ko localhost:5173 par start karta hai
REM    3. Cloudflare Tunnel se ek public URL banata hai
REM
REM  IMPORTANT:
REM   - Ye script BAND karne par website reset ho jayegi (normal).
REM   - Aapki original files/config kabhi change nahi hoti.
REM   - Tunnel ka URL HAR BAAR naya hota hai.
REM ============================================================
setlocal
title SellHive - Cloudflare Demo Tunnel

echo ==================================================
echo   SellHive - Cloudflare Demo Tunnel Setup
echo ==================================================
echo.

REM ------------------------------------------------------------
REM Step 1: Backend ko localhost:8000 par start karo
REM ------------------------------------------------------------
echo [1/4] Starting Laravel backend on http://localhost:8000 ...
set PHP_EXE=php
where php >nul 2>nul
if errorlevel 1 set PHP_EXE=C:\xampp\php\php.exe
start "SellHive Backend" /D "%~dp0backend" "%PHP_EXE%" artisan serve --port=8000

REM ------------------------------------------------------------
REM Step 2: Frontend ko localhost:5173 par start karo
REM ------------------------------------------------------------
echo [2/4] Starting React frontend on http://localhost:5173 ...
start "SellHive Frontend" /D "%~dp0frontend" cmd /k "npm run dev"

REM ------------------------------------------------------------
REM Step 3: Cloudflared check/download karo (agar na ho)
REM ------------------------------------------------------------
echo [3/4] Checking for cloudflared...

set CLOUDFLARE_BIN=%~dp0cloudflared.exe
if exist "%CLOUDFLARE_BIN%" goto cloudflared_ready

echo   cloudflared not found. Downloading it now...
echo   (Sirf ek 30MB exe download hota hai - website par koi asar nahi)
echo.
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile '%CLOUDFLARE_BIN%'"
if not exist "%CLOUDFLARE_BIN%" (
    echo.
    echo [ERROR] cloudflared download FAILED. Internet check karo.
    echo Manual download: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
    pause
    exit /b 1
)

:cloudflared_ready
echo   cloudflared ready.
echo.

REM ------------------------------------------------------------
REM Step 4: Cloudflare Tunnel chalao (localhost:5173 par)
REM ------------------------------------------------------------
echo [4/4] Creating public URL via Cloudflare Tunnel...
echo.
echo   WAIT... 10-15 second lagega generate hone mein.
echo   Jab 'trycloudflare.com' wala URL dikhe, wo client ko DO.
echo.
echo   NOTE: URL ko 4 hours tak khula rakhne ke liye
echo   ye window BAND NAHI karna.
echo.
echo   Website band karne ke liye: is window + 2 aur windows band karo.
echo.
echo ==================================================
echo   DEMO KA URL NEE CHE TERMINAL OUTPUT MEIN DIKHEGA
echo ==================================================
echo.

"%CLOUDFLARE_BIN%" tunnel --url http://localhost:5173

echo.
echo Tunnel band ho gaya. Demo khatam.
pause
endlocal
