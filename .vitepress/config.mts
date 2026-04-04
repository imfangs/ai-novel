import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 小说',
  description: 'AI 辅助创作的小说集',
  base: '/',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '金鼓谣', link: '/novels/jin-gu-yao/' },
      { text: '老张餐馆', link: '/novels/lao-zhang-restaurant/' },
    ],

    sidebar: {
      '/novels/jin-gu-yao/': [
        {
          text: '金鼓谣',
          link: '/novels/jin-gu-yao/',
          items: [
            {
              text: '正文',
              collapsed: false,
              items: [
                { text: '序章：长安槐', link: '/novels/jin-gu-yao/chapters/00' },
                { text: '第一章：长安夜', link: '/novels/jin-gu-yao/chapters/01' },
                { text: '第二章：南山路', link: '/novels/jin-gu-yao/chapters/02' },
                { text: '第三章：开仓', link: '/novels/jin-gu-yao/chapters/03' },
                { text: '第四章：狐与虎', link: '/novels/jin-gu-yao/chapters/04' },
                { text: '第五章：名分', link: '/novels/jin-gu-yao/chapters/05' },
                { text: '第六章：军法', link: '/novels/jin-gu-yao/chapters/06' },
              ],
            },
            {
              text: '短剧改编',
              collapsed: false,
              items: [
                { text: '短剧总览', link: '/novels/jin-gu-yao/drama/' },
                { text: '第1集：缝不完的袍子', link: '/novels/jin-gu-yao/drama/01' },
                { text: '第2集：月亮与槐花', link: '/novels/jin-gu-yao/drama/02' },
                { text: '第3集：八岁那年的马', link: '/novels/jin-gu-yao/drama/03' },
                { text: '第4集：天亮之前', link: '/novels/jin-gu-yao/drama/04' },
                { text: '第5集：两盘棋', link: '/novels/jin-gu-yao/drama/05' },
              ],
            },
            {
              text: '创作幕后',
              collapsed: true,
              items: [
                { text: '幕后总览', link: '/novels/jin-gu-yao/behind-the-scenes/' },
                { text: '圣经', link: '/novels/jin-gu-yao/behind-the-scenes/bible' },
                { text: '大纲', link: '/novels/jin-gu-yao/behind-the-scenes/outline' },
                { text: '人物谱', link: '/novels/jin-gu-yao/behind-the-scenes/characters' },
                { text: '历史资料', link: '/novels/jin-gu-yao/behind-the-scenes/history' },
                { text: '风格指南', link: '/novels/jin-gu-yao/behind-the-scenes/style-guide' },
                { text: '创意提案', link: '/novels/jin-gu-yao/behind-the-scenes/creative-proposal' },
                { text: '修改方案', link: '/novels/jin-gu-yao/behind-the-scenes/revision-plan' },
                { text: '改进备忘', link: '/novels/jin-gu-yao/behind-the-scenes/improvements' },
              ],
            },
          ],
        },
      ],

      '/novels/lao-zhang-restaurant/': [
        {
          text: '老张餐馆',
          link: '/novels/lao-zhang-restaurant/',
          items: [
            {
              text: '正文',
              collapsed: false,
              items: [
                // 章节待添加
              ],
            },
            {
              text: '项目资料',
              collapsed: false,
              items: [
                { text: '项目路演', link: '/novels/lao-zhang-restaurant/pitch' },
                { text: '故事大纲', link: '/novels/lao-zhang-restaurant/behind-the-scenes/outline' },
              ],
            },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    outline: { label: '本页目录' },
    docFooter: { prev: '上一章', next: '下一章' },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdated: { text: '最后更新' },
  },
})
