#!/bin/bash

# Local CI Test Script for x-learn-ghost-theme
# Run this before pushing to ensure all CI checks pass

set -e  # Exit on first error

echo "🚀 Starting local CI tests..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
FAILED=0

# ============================================
# 1. Check package.json format
# ============================================
echo "📦 [1/6] Checking package.json format..."
if ! jq empty package.json 2>/dev/null; then
  echo -e "${RED}❌ Invalid package.json format${NC}"
  FAILED=1
else
  echo -e "${GREEN}✅ package.json is valid${NC}"
fi
echo ""

# ============================================
# 2. Validate Handlebars templates
# ============================================
echo "📝 [2/6] Validating Handlebars templates..."
HBS_ERROR=0
find . -name "*.hbs" -type f | while read file; do
  # Check for unclosed tags and mismatched helpers
  if grep -Pzo '{{[^}]*\n[^{]*{{' "$file" 2>/dev/null; then
    echo -e "${RED}❌ Potential multiline syntax error in $file${NC}"
    exit 1
  fi
  # Check for unmatched opening/closing tags ({{# and {{^ are both opening tags)
  open_count=$(grep -oE '{{#|{{\^' "$file" | wc -l)
  close_count=$(grep -o '{{/' "$file" | wc -l)
  if [ "$open_count" -ne "$close_count" ]; then
    echo -e "${RED}❌ Mismatched block helpers in $file (opening count: $open_count, closing count: $close_count)${NC}"
    exit 1
  fi
done
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ All Handlebars templates are valid${NC}"
else
  FAILED=1
fi
echo ""

# ============================================
# 3. Install dependencies
# ============================================
echo "📥 [3/6] Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci --quiet
else
  npm install --quiet
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# ============================================
# 4. Check Tailwind CSS Build
# ============================================
echo "🎨 [4/6] Checking Tailwind CSS build..."
if [ ! -f "assets/css/app.min.css" ]; then
  echo -e "${YELLOW}⚠️  app.min.css not found, attempting to build...${NC}"
  if command -v npm run build &> /dev/null; then
    npm run build
  else
    echo -e "${RED}❌ Build failed: app.min.css not found and cannot build${NC}"
    FAILED=1
  fi
fi

if [ -f "assets/css/app.min.css" ]; then
  SIZE=$(du -h assets/css/app.min.css | cut -f1)
  echo -e "${GREEN}✅ CSS build exists: app.min.css size: $SIZE${NC}"
else
  echo -e "${RED}❌ CSS build missing${NC}"
  FAILED=1
fi
echo ""

# ============================================
# 5. Validate Ghost theme with gscan
# ============================================
echo "👻 [5/6] Validating Ghost theme with gscan..."
if npx gscan . --fatal --verbose; then
  echo -e "${GREEN}✅ Ghost theme validation passed${NC}"
else
  echo -e "${RED}❌ Ghost theme validation failed${NC}"
  FAILED=1
fi
echo ""

# ============================================
# 6. Security Audit (npm audit)
# ============================================
echo "🔒 [6/6] Running security audit..."
if npm audit --audit-level=high; then
  echo -e "${GREEN}✅ No high-severity vulnerabilities found${NC}"
else
  echo -e "${YELLOW}⚠️  Security vulnerabilities detected (run 'npm audit fix')${NC}"
  # Don't fail on audit issues, just warn
fi
echo ""

# ============================================
# Final Summary
# ============================================
echo "============================================"
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All CI tests passed! Safe to push.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some CI tests failed. Please fix before pushing.${NC}"
  exit 1
fi
