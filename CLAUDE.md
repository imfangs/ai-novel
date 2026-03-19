# AI Novel — 金鼓谣 VitePress 小说网站

## 项目概述

以唐代平阳昭公主为主角的历史传奇小说《金鼓谣》的在线阅读网站。
- 仓库：https://github.com/imfangs/ai-novel (public)
- 网站：https://story.fangs.cc （自定义域名，CNAME 指向 imfangs.github.io）
- 技术栈：VitePress 1.6.x
- 小说源文件：`/Users/fangs/ai/小说/平阳昭公主/`

## 目录结构

```
ai-novel/
├── .github/workflows/deploy.yml    # CI/CD（当前因 billing 问题不可用）
├── .vitepress/
│   ├── config.mts                  # VitePress 配置（侧边栏、导航、base 路径）
│   └── theme/
│       ├── index.ts                # 自定义主题注册
│       └── style.css               # CJK 排版 + 文学风格 CSS
├── index.md                        # 网站首页
├── novels/
│   └── jin-gu-yao/                 # 金鼓谣（拼音 slug）
│       ├── index.md                # 小说介绍页
│       ├── chapters/01-05.md       # 正文章节
│       └── behind-the-scenes/      # 创作幕后（圣经、大纲、人物谱等）
├── package.json
└── README.md
```

## 部署方式

**当前使用 legacy Pages 模式**（不依赖 GitHub Actions，绕过 billing 限制）：
- 源代码在 `main` 分支
- 构建产物在 `gh-pages` 分支
- Pages source 配置为 `gh-pages` 分支 `/` 路径

### 更新部署流程

```bash
# 1. 在 main 分支修改内容并构建
npm run docs:build

# 2. 暂存 dist 到临时目录
rm -rf /tmp/ai-novel-dist
cp -r .vitepress/dist /tmp/ai-novel-dist
echo "story.fangs.cc" > /tmp/ai-novel-dist/CNAME
touch /tmp/ai-novel-dist/.nojekyll

# 3. 切到 gh-pages，清空，复制构建产物
git checkout gh-pages
find . -maxdepth 1 -not -name '.git' -not -name '.' -exec rm -rf {} +
cp -r /tmp/ai-novel-dist/* /tmp/ai-novel-dist/.nojekyll .
git add -A
git commit -m "deploy: update site"
git push origin gh-pages --force

# 4. 切回 main
git checkout main --force
```

> 如果以后 GitHub billing 恢复，可以切回 Actions 自动部署模式：
> `gh api repos/imfangs/ai-novel/pages -X PUT --input - <<< '{"build_type":"workflow"}'`

## 自定义主题要点

- **字体**：Noto Serif SC（Google Fonts）+ Songti SC / SimSun 回退
- **配色**：暖色调宣纸背景 `#faf8f5`、墨色文字 `#2c2a25`、朱砂色强调 `#b5452f`
- **暗色模式**：古墨风格 `#1a1814`
- **排版**：`line-height: 1.9`、`letter-spacing: 0.02em`、`max-width: 720px`、两端对齐
- **场景分隔符**：CSS 将 `---` 渲染为 `◆  ◆  ◆` 居中装饰符
- **base 路径**：`/`（使用自定义域名后改为根路径）

## 添加新章节

1. 在 `novels/jin-gu-yao/chapters/` 下创建新 md 文件（如 `06.md`）
2. 添加 frontmatter：`title` + `outline: false`
3. 更新 `.vitepress/config.mts` 侧边栏的正文 items 数组
4. 更新 `novels/jin-gu-yao/index.md` 章节目录表
5. 构建并部署到 gh-pages

## 添加新小说

在 `novels/` 下创建新目录（拼音 slug），参照 `jin-gu-yao/` 结构，然后在 `config.mts` 中添加对应的侧边栏路径配置。

## 文件迁移映射

| 源文件（小说/平阳昭公主/） | 目标 |
|---------------------------|------|
| 章节/第01-05章.md | chapters/01-05.md（第1章清理了标题中的"B版·轻松版"） |
| 圣经.md | behind-the-scenes/bible.md |
| 大纲.md | behind-the-scenes/outline.md |
| 人物谱.md | behind-the-scenes/characters.md |
| 历史资料.md | behind-the-scenes/history.md |
| 风格指南.md | behind-the-scenes/style-guide.md |
| 创意提案-v2.md | behind-the-scenes/creative-proposal.md |
| 修改方案-v1.md | behind-the-scenes/revision-plan.md |
