module.exports = {
  title: '向阳的技术博客',
  description: '向阳的技术博客',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
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
                { text: '掘金', link: 'https://juejin.cn/user/3526889035282551/posts' }
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
      }
    ]
  },
  base: '/blog/'
}