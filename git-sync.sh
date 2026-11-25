#!/usr/bin/env bash

# ==============================================================================
# Git Commit & Sync Script (Universal v0.5.0 - Portfolio)
# Syncs local repository with remote GitHub Pages branch cleanly.
# Usage: ./git-sync.sh [options]
# Options:
#   --sync                  Non-interactive mode (commit & push only)
#   -m, --message "msg"     Commit message (auto-timestamps if left blank)
#   -b, --branch "branch"   Target branch (defaults to current branch)
#   -t, --tag "tag"         Release tag to push (e.g., v1.0.0)
#   --skip-ci               Append [skip ci] to commit message
#   --watch                 Watch streaming GitHub Pages / Actions logs via gh CLI
#   -h, --help              Show help message
#   -v, --version           Show script version
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

VERSION="v0.5.0"
SYNC_ONLY=false
COMMIT_MSG=""
TARGET_BRANCH=""
RELEASE_TAG=""
SKIP_CI=false
WATCH_CI=false

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --sync)
            SYNC_ONLY=true
            shift
            ;;
        -m|--message)
            COMMIT_MSG="$2"
            shift 2
            ;;
        -b|--branch)
            TARGET_BRANCH="$2"
            shift 2
            ;;
        -t|--tag)
            RELEASE_TAG="$2"
            shift 2
            ;;
        --skip-ci)
            SKIP_CI=true
            shift
            ;;
        --watch)
            WATCH_CI=true
            shift
            ;;
        -v|--version)
            echo -e "git-sync.sh ${VERSION}"
            exit 0
            ;;
        -h|--help|-help|-\?)
            echo -e "${BOLD}Usage:${NC} ./git-sync.sh [options]"
            echo ""
            echo "Options:"
            echo "  --sync                Skip interactive prompts (git commit & push only)"
            echo "  -m, --message <msg>   Commit message (defaults to timestamp if blank)"
            echo "  -b, --branch <branch> Target branch (defaults to current active branch)"
            echo "  -t, --tag <tag>       Create and push a release tag (e.g. v1.0.0)"
            echo "  --skip-ci             Append [skip ci] to avoid triggering GitHub Pages build"
            echo "  --watch               Watch streaming CI logs via gh CLI after push"
            echo "  -v, --version         Display script version"
            echo "  -h, --help            Display this help dialog"
            exit 0
            ;;
        *)
            echo -e "${RED}Error: Unknown parameter passed: $1${NC}"
            echo -e "Run ${YELLOW}./git-sync.sh --help${NC} for available options."
            exit 1
            ;;
    esac
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo -e "${RED}Error: Not inside a Git repository. Run 'git init' first.${NC}"
    exit 1
fi

echo -e "${BLUE}=== Starting Portfolio Sync (${VERSION}) ===${NC}"

# 1. Branch Resolution
current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")

if [[ -z "$TARGET_BRANCH" ]]; then
    if [[ "$SYNC_ONLY" == true ]]; then
        TARGET_BRANCH="$current_branch"
    else
        echo -e "${YELLOW}Available local branches:${NC}"
        git branch --format="  %(refname:short)" 2>/dev/null || echo "  $current_branch"
        echo ""
        read -p "Target branch [$current_branch]: " user_branch
        TARGET_BRANCH=${user_branch:-$current_branch}
    fi
fi

if [[ "$current_branch" != "$TARGET_BRANCH" ]]; then
    echo -e "${YELLOW}Switching to branch '$TARGET_BRANCH'...${NC}"
    git checkout "$TARGET_BRANCH" 2>/dev/null || git checkout -b "$TARGET_BRANCH"
fi

# 2. Stage and Commit Changes
echo -e "${BLUE}Staging modified files...${NC}"
git add .

if [[ -n "$(git status --porcelain)" ]]; then
    if [[ -z "$COMMIT_MSG" ]]; then
        if [[ "$SYNC_ONLY" == true ]]; then
            COMMIT_MSG="sync: automated update $(date '+%d-%b-%Y %H:%M')"
        else
            read -p "Enter commit message (leave blank for auto-timestamp): " user_msg
            COMMIT_MSG=${user_msg:-"$(date '+%d-%b-%Y-T-%H:%M')"}
        fi
    fi

    if [[ "$SKIP_CI" == true && "$COMMIT_MSG" != *"[skip ci]"* ]]; then
        COMMIT_MSG="$COMMIT_MSG [skip ci]"
    fi

    echo -e "${BLUE}Committing changes: ${BOLD}${COMMIT_MSG}${NC}"
    git commit -m "$COMMIT_MSG"
else
    echo -e "${YELLOW}Working tree clean. No new changes to commit.${NC}"
fi

# 3. Pull & Push Remote Verification
has_remote=$(git remote 2>/dev/null || true)

if [[ -n "$has_remote" ]]; then
    if git ls-remote --exit-code --heads origin "$TARGET_BRANCH" >/dev/null 2>&1; then
        echo -e "${BLUE}Fetching and rebasing with origin/$TARGET_BRANCH...${NC}"
        git fetch origin "$TARGET_BRANCH" --tags
        git pull --rebase origin "$TARGET_BRANCH"
    else
        echo -e "${YELLOW}Remote branch 'origin/$TARGET_BRANCH' does not exist yet; pushing new branch.${NC}"
    fi

    echo -e "${BLUE}Pushing to origin/$TARGET_BRANCH...${NC}"
    git push -u origin "$TARGET_BRANCH"
    echo -e "${GREEN}✓ Successfully synced with origin/$TARGET_BRANCH!${NC}"

    if [[ "$WATCH_CI" == true ]]; then
        if command -v gh >/dev/null 2>&1; then
            echo -e "${BLUE}Checking for GitHub Actions workflow run...${NC}"
            sleep 3
            latest_run=$(gh run list --branch "$TARGET_BRANCH" --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null || true)
            if [[ -n "$latest_run" ]]; then
                echo -e "${BLUE}Streaming CI logs for run #${latest_run}...${NC}"
                gh run watch "$latest_run" || true
            else
                echo -e "${YELLOW}No active CI run found to watch.${NC}"
            fi
        else
            echo -e "${YELLOW}GitHub CLI (gh) not installed. Skipping --watch.${NC}"
        fi
    fi
else
    echo -e "${YELLOW}Notice: No remote configured. Local commit succeeded.${NC}"
fi

if [[ "$SYNC_ONLY" == true ]]; then
    exit 0
fi

# 4. Optional Release Tagging
echo -e "\n${YELLOW}--- Release Tag ---${NC}"
if [[ -z "$RELEASE_TAG" ]]; then
    read -p "Do you want to publish a release tag now? (y/n) [n]: " trigger_release
else
    trigger_release="y"
fi

if [[ "${trigger_release,,}" == "y" ]]; then
    if [[ -z "$RELEASE_TAG" ]]; then
        read -p "Enter version tag (e.g. v1.0.0): " RELEASE_TAG
    fi

    if [[ -n "$RELEASE_TAG" ]]; then
        if git rev-parse -q --verify "refs/tags/$RELEASE_TAG" >/dev/null; then
            echo -e "${RED}Warning: Tag '$RELEASE_TAG' already exists!${NC}"
            read -p "Do you want to overwrite it? (y/n) [n]: " replace_tag
            if [[ "${replace_tag,,}" == "y" ]]; then
                git tag -d "$RELEASE_TAG" 2>/dev/null || true
                if [[ -n "$has_remote" ]]; then
                    git push origin --delete "$RELEASE_TAG" 2>/dev/null || true
                fi
            else
                echo -e "${BLUE}Release tagging skipped.${NC}"
                RELEASE_TAG=""
            fi
        fi

        if [[ -n "$RELEASE_TAG" ]]; then
            git tag "$RELEASE_TAG"
            if [[ -n "$has_remote" ]]; then
                git push origin "$RELEASE_TAG"
                echo -e "${GREEN}✓ Release tag '$RELEASE_TAG' created and pushed!${NC}"
            else
                echo -e "${GREEN}✓ Release tag '$RELEASE_TAG' created locally.${NC}"
            fi
        fi
    fi
fi

echo -e "\n${GREEN}✓ All operations completed successfully.${NC}"
