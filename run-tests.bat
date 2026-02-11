@echo off
REM Fitness Tracker - Automated Test Script (Windows)
REM This script runs all tests and generates reports

echo ============================================
echo Fitness Tracker - Automated Test Execution
echo ============================================
echo.

set BACKEND_TESTS_PASSED=0
set FRONTEND_TESTS_PASSED=0

REM Check if backend directory exists
if not exist "backend" (
    echo [ERROR] Backend directory not found!
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo [ERROR] Frontend directory not found!
    exit /b 1
)

REM ============================================
REM Backend Tests
REM ============================================

echo.
echo ============================================
echo Running Backend Tests
echo ============================================
echo.

cd backend

REM Check for Maven
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Maven not found, using Maven wrapper
    set MAVEN_CMD=mvnw.cmd
) else (
    set MAVEN_CMD=mvn
)

REM Clean and compile
echo Compiling backend code...
call %MAVEN_CMD% clean compile

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Backend compilation successful
) else (
    echo [ERROR] Backend compilation failed
    exit /b 1
)

REM Run tests
echo.
echo Running backend unit tests...
call %MAVEN_CMD% test

if %ERRORLEVEL% EQU 0 (
    set BACKEND_TESTS_PASSED=1
    echo [SUCCESS] Backend tests passed
) else (
    echo [ERROR] Backend tests failed
)

REM Generate test report
echo.
echo Generating test reports...
call %MAVEN_CMD% surefire-report:report

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Test report generated at: backend\target\site\surefire-report.html
)

cd ..

REM ============================================
REM Frontend Tests
REM ============================================

echo.
echo ============================================
echo Running Frontend Tests
echo ============================================
echo.

cd frontend

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found! Please install Node.js
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Run tests
echo.
echo Running frontend unit tests...
call npm test -- --run

if %ERRORLEVEL% EQU 0 (
    set FRONTEND_TESTS_PASSED=1
    echo [SUCCESS] Frontend tests passed
) else (
    echo [ERROR] Frontend tests failed
)

REM Generate coverage report
echo.
echo Generating coverage report...
call npm run test:coverage -- --run

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Coverage report generated at: frontend\coverage\index.html
)

cd ..

REM ============================================
REM Test Summary
REM ============================================

echo.
echo ============================================
echo Test Summary
echo ============================================
echo.

if %BACKEND_TESTS_PASSED% EQU 1 (
    echo Backend Tests:  [PASSED]
) else (
    echo Backend Tests:  [FAILED]
)

if %FRONTEND_TESTS_PASSED% EQU 1 (
    echo Frontend Tests: [PASSED]
) else (
    echo Frontend Tests: [FAILED]
)

echo.
echo Test Reports:
echo   Backend:  backend\target\site\surefire-report.html
echo   Frontend: frontend\coverage\index.html
echo.

if %BACKEND_TESTS_PASSED% EQU 1 if %FRONTEND_TESTS_PASSED% EQU 1 (
    echo [SUCCESS] All tests passed!
    exit /b 0
) else (
    echo [ERROR] Some tests failed. Please review the reports.
    exit /b 1
)
