#!/bin/bash
# Sync script for AYUSHWA GitHub repository (no hardcoded credentials)
set -e

echo "=== Syncing AI Travel Intelligence Agent to GitHub ==="
git add -A
git commit -m "feat(compare): add sub-second live web fare engine and Vercel serverless API routes" || echo "No local changes to commit"
git push origin main
echo "=== Successfully pushed to https://github.com/ayushsunilsharma12345-eng/AYUSHWA ==="
echo "=== Vercel will deploy automatically at https://ayushwa.vercel.app/ ==="
