#!/bin/bash

# Fitness Tracker - Automated Test Script
# This script runs all tests and generates reports

echo "============================================"
echo "Fitness Tracker - Automated Test Execution"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results
BACKEND_TESTS_PASSED=0
FRONTEND_TESTS_PASSED=0

# Function to print section header
print_header() {
    echo ""
    echo "============================================"
    echo "$1"
    echo "============================================"
    echo ""
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if backend directory exists
if [ ! -d "backend" ]; then
    print_error "Backend directory not found!"
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    print_error "Frontend directory not found!"
    exit 1
fi

# ============================================
# Backend Tests
# ============================================

print_header "Running Backend Tests"

cd backend

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    print_warning "Maven not found, using Maven wrapper"
    MAVEN_CMD="./mvnw"
else
    MAVEN_CMD="mvn"
fi

# Clean and compile
echo "Compiling backend code..."
$MAVEN_CMD clean compile

if [ $? -eq 0 ]; then
    print_success "Backend compilation successful"
else
    print_error "Backend compilation failed"
    exit 1
fi

# Run tests
echo ""
echo "Running backend unit tests..."
$MAVEN_CMD test

if [ $? -eq 0 ]; then
    BACKEND_TESTS_PASSED=1
    print_success "Backend tests passed"
else
    print_error "Backend tests failed"
fi

# Generate test report
echo ""
echo "Generating test reports..."
$MAVEN_CMD surefire-report:report

if [ $? -eq 0 ]; then
    print_success "Test report generated at: backend/target/site/surefire-report.html"
fi

# Generate coverage report (if JaCoCo is configured)
if grep -q "jacoco" pom.xml; then
    echo ""
    echo "Generating coverage report..."
    $MAVEN_CMD jacoco:report
    if [ $? -eq 0 ]; then
        print_success "Coverage report generated at: backend/target/site/jacoco/index.html"
    fi
fi

cd ..

# ============================================
# Frontend Tests
# ============================================

print_header "Running Frontend Tests"

cd frontend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js not found! Please install Node.js"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run tests
echo ""
echo "Running frontend unit tests..."
npm test -- --run

if [ $? -eq 0 ]; then
    FRONTEND_TESTS_PASSED=1
    print_success "Frontend tests passed"
else
    print_error "Frontend tests failed"
fi

# Generate coverage report
echo ""
echo "Generating coverage report..."
npm run test:coverage -- --run

if [ $? -eq 0 ]; then
    print_success "Coverage report generated at: frontend/coverage/index.html"
fi

cd ..

# ============================================
# API Integration Tests (Optional)
# ============================================

print_header "API Integration Tests"

# Check if backend is running
if curl -s http://localhost:8080/api/workouts > /dev/null 2>&1; then
    print_success "Backend API is running"
    
    echo ""
    echo "Running API tests..."
    
    # Test GET all workouts
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/workouts)
    if [ "$RESPONSE" = "200" ]; then
        print_success "GET /api/workouts - Status: 200 OK"
    else
        print_error "GET /api/workouts - Status: $RESPONSE"
    fi
    
    # Test GET all goals
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/goals)
    if [ "$RESPONSE" = "200" ]; then
        print_success "GET /api/goals - Status: 200 OK"
    else
        print_error "GET /api/goals - Status: $RESPONSE"
    fi
    
else
    print_warning "Backend API is not running. Skipping integration tests."
    print_warning "Start backend with: cd backend && ./mvnw spring-boot:run"
fi

# ============================================
# Test Summary
# ============================================

print_header "Test Summary"

echo "Backend Tests:  $([ $BACKEND_TESTS_PASSED -eq 1 ] && echo -e "${GREEN}PASSED${NC}" || echo -e "${RED}FAILED${NC}")"
echo "Frontend Tests: $([ $FRONTEND_TESTS_PASSED -eq 1 ] && echo -e "${GREEN}PASSED${NC}" || echo -e "${RED}FAILED${NC}")"

echo ""
echo "Test Reports:"
echo "  Backend:  backend/target/site/surefire-report.html"
echo "  Frontend: frontend/coverage/index.html"

echo ""
if [ $BACKEND_TESTS_PASSED -eq 1 ] && [ $FRONTEND_TESTS_PASSED -eq 1 ]; then
    print_success "All tests passed!"
    exit 0
else
    print_error "Some tests failed. Please review the reports."
    exit 1
fi
