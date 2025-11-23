#!/bin/bash

# Release script for xDev Learn Ghost Theme
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 1.0.1

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Version number required${NC}"
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 1.0.1"
    exit 1
fi

VERSION=$1
TAG="v${VERSION}"

echo -e "${YELLOW}==================================${NC}"
echo -e "${YELLOW}Creating Release v${VERSION}${NC}"
echo -e "${YELLOW}==================================${NC}"
echo ""

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}Error: Working directory is not clean${NC}"
    echo "Please commit or stash your changes first"
    git status -s
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}Warning: You're on branch '$CURRENT_BRANCH', not 'main'${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo -e "${RED}Error: Tag $TAG already exists${NC}"
    exit 1
fi

# Run tests
echo -e "${GREEN}Step 1: Running tests...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Validate with GScan
echo -e "${GREEN}Step 2: Validating theme with GScan...${NC}"
npx gscan . --fatal --verbose
if [ $? -ne 0 ]; then
    echo -e "${RED}Theme validation failed!${NC}"
    exit 1
fi

# Update version in package.json
echo -e "${GREEN}Step 3: Updating package.json version...${NC}"
npm version "$VERSION" --no-git-tag-version

# Update CHANGELOG.md
echo -e "${GREEN}Step 4: Updating CHANGELOG.md...${NC}"
DATE=$(date +%Y-%m-%d)
sed -i.bak "s/## \[Unreleased\]/## [Unreleased]\n\n## [$VERSION] - $DATE/" CHANGELOG.md
rm CHANGELOG.md.bak 2>/dev/null || true

# Commit changes
echo -e "${GREEN}Step 5: Committing version changes...${NC}"
git add package.json CHANGELOG.md
git commit -m "chore: Release v${VERSION}"

# Create and push tag
echo -e "${GREEN}Step 6: Creating and pushing tag...${NC}"
git tag -a "$TAG" -m "Release v${VERSION}"
git push origin main
git push origin "$TAG"

echo ""
echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}✅ Release v${VERSION} created!${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""
echo "GitHub Actions will now:"
echo "  1. Run all tests"
echo "  2. Build the theme"
echo "  3. Create release package"
echo "  4. Publish to GitHub Releases"
echo ""
echo "Check progress at:"
echo "https://github.com/xdev-asia-labs/x-learn-ghost-theme/actions"
echo ""
echo "Release page (available after workflow completes):"
echo "https://github.com/xdev-asia-labs/x-learn-ghost-theme/releases/tag/$TAG"
