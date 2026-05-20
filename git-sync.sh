#!/bin/bash

# Git Commit & Sync Script
# Syncs local repository with remote

# Default commit message if none is provided
commit_message="Auto-sync: Update files"

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Trackify git sync...${NC}"

# Stage all changes
echo -e "${BLUE}Staging changes...${NC}"
git add .

# Commit changes
echo -e "${BLUE}Committing changes...${NC}"
read -p "Enter commit message: " commit_message
git commit -m "$commit_message" || echo "No changes to commit"

# Fetch latest changes from remote
echo -e "${BLUE}Fetching from remote...${NC}"
git fetch origin

# Pull latest changes to current branch
echo -e "${BLUE}Pulling changes...${NC}"
git pull origin "$(git rev-parse --abbrev-ref HEAD)"

# Push local commits to remote
echo -e "${BLUE}Pushing changes...${NC}"
git push origin "$(git rev-parse --abbrev-ref HEAD)"

echo -e "${GREEN}Git sync completed successfully!${NC}"