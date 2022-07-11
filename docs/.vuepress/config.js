module.exports = {
  title: '向阳的技术博客',
  description: '向阳的技术博客',
  theme: 'reco',
  base: '/blog/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  plugins: [
    [
      require('./vuepress-plugin-code-copy'),
      {
        copyButtonText: '复制',
        copiedButtonText: '已复制！'
      }
    ]
  ],
  markdown: {
    extendMarkdown: (md) => {
      md.use(function (md) {
        const fence = md.renderer.rules.fence
        md.renderer.rules.fence = (...args) => {
          let rawCode = fence(...args)
          rawCode = rawCode.replace(
            /<span class="token comment">\/\/ try-link https:\/\/(.*)<\/span>\n/gi,
            '<a href="$1" class="try-button" target="_blank">Try</a>'
          )
          return `${rawCode}`
        }
      })
    }
  },
  themeConfig: {
    lastUpdated: '上次更新',
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '向阳',
        items: [
          { text: 'Github', link: 'https://github.com/lxqddd' },
          {
            text: '掘金',
            link: 'https://juejin.cn/user/3526889035282551/posts'
          }
        ]
      }
    ],
    sidebar: [
      {
        title: '欢迎学习',
        path: '/',
        collapsable: false, // 不折叠
        children: [
          {
            title: '学前必读',
            path: '/'
          }
        ]
      },
      {
        title: '基础学习',
        path: '/handbook/Article',
        collapsable: false,
        children: [
          {
            title: '第一篇文章',
            path: '/handbook/Article'
          }
        ]
      },
      {
        title: '每日一题',
        path: '/questionOfTheDay/srcVsHref',
        collapsable: false,
        children: [
          {
            title: 'src 和 href 的对比',
            path: '/questionOfTheDay/srcVsHref'
          }
        ]
      }
    ]
  }
}
