module.exports = {
  title: 'zhou\'s Blog',
  description: 'Lucky zhouzhou',
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    [
      'link', {
        rel: 'icon',
        href: '/images/logo.jpg'
      }
    ],
    [
      'link', {
        rel: 'manifest',
        href: '/images/logo.jpg'
      }
    ],
    [
      'link', {
        rel: 'apple-touch-icon',
        href: '/images/logo.jpg'
      }
    ],
    [
      'meta', {
        'http-quiv': 'pragma',
        cotent: 'no-cache'
      }
    ],
    [
      'meta', {
        'http-quiv': 'pragma',
        cotent: 'no-cache,must-revalidate'
      }
    ],
    [
      'meta', {
        'http-quiv': 'expires',
        cotent: '0'
      }
    ]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { // 导航栏配置
        text: 'JavaScript',
        link: '/javascript/'
      }, {
        text: 'ES6',
        link: '/es6/'
      }, {   
        text: 'CSS',
        link: '/css/'
      }, {
        text: '小程序',
        link: '/wechat/'
      },
      {
        text: '小技能',
        link: '/others/'
      },
      {
        text: '书籍资料',
        link: '/books/'
      },
      {
        text:'关于我',
        link:'/about/'
      }
    ],
    sidebar: {
        '/javascript/': [
            {
                title: '每日一题',  //组名
                children: [
                  'daily'
                ]
            },
            {
              title: 'JavaScript进阶',  //组名
              children: [
                'forword'
              ]
          },
          {
            title: '理论', 
            children: [
              'concept'
            ]
        },
        ],
        '/about/':[
          {
            title:'关于我',
            children:['about']
          }
        ],
        '/others/':[
          {
            title:'杂七杂八',
            children:['smallCode']
          }
        ],
        '/books/':[
          {
            title:'书籍资料',
            children:['']
          },
          {
            title:'study',
            children:['booklist']
          }
        ],
        '/css/':[
          {
            title:'css小功能',
            children:['']
          }
        ],
    },
    // sidebar:'auto',
    
    sidebarDepth: 2
  }
};
