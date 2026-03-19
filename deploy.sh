#!/bin/bash
# 部署脚本：构建 VitePress 并推送到 gh-pages
# 用法：./deploy.sh [commit message]

set -e

MSG="${1:-deploy: update site}"
DIST_TMP="/tmp/vitepress-dist-$$"
ON_GHPAGES=false

# 异常退出时确保回到 main 分支
cleanup() {
  if [ "$ON_GHPAGES" = true ]; then
    echo "⚠️  异常退出，切回 main..."
    git checkout main --force
  fi
  rm -rf "$DIST_TMP"
}
trap cleanup EXIT

# 确保在 main 分支
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  echo "❌ 当前不在 main 分支（在 $BRANCH），请先切回 main"
  exit 1
fi

# 检查是否有未提交的改动
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "⚠️  main 分支有未提交的改动，先提交："
  git add -A
  git commit -m "$MSG"
  git push origin main
  echo "✅ main 已提交并推送"
else
  echo "✅ main 分支干净"
fi

# 安装依赖（如果 node_modules 不在）
if [ ! -d "node_modules" ]; then
  echo "📦 安装依赖..."
  npm install
fi

# 构建
echo "🔨 构建中..."
npx vitepress build

# 复制构建产物到临时目录
rm -rf "$DIST_TMP"
cp -r .vitepress/dist "$DIST_TMP"

# 切到 gh-pages
git checkout gh-pages
ON_GHPAGES=true

# 清除旧文件（保留 .git）
find . -maxdepth 1 \
  ! -name '.' \
  ! -name '.git' \
  -exec rm -rf {} +

# 复制新构建产物
cp -r "$DIST_TMP"/* .
touch .nojekyll
echo "story.fangs.cc" > CNAME

# 提交并推送
git add -A

if git diff --cached --quiet; then
  echo "ℹ️  没有变化，跳过部署"
else
  git commit -m "$MSG"
  git push origin gh-pages
  echo "✅ 已部署到 gh-pages"
fi

# 切回 main
git checkout main --force
ON_GHPAGES=false

echo "🎉 完成！等 1-2 分钟后刷新 story.fangs.cc 查看"
