const app = getApp()
var {log}=console
Page({
  data: {
    backgroundColor:'white',
    current:0,
    tabBar: [
      {
        pagePath: '/pages/tabbar/index/index',
        text: '首页',
        iconPath: '/images/home.png',
        selectedIconPath: '/images/home-cur.png'
      },
      {
        pagePath: '/pages/tabbar/mission/mission',
        text: '任务',
        iconPath: '/images/mission.png',
        selectedIconPath: '/images/mission-cur.png'
      },
      {
        pagePath: '/pages/tabbar/timeline/timeline',
        text: '时间轴',
        iconPath: '/images/timeline.png',
        selectedIconPath: '/images/timeline-cur.png'
      },
      {
        pagePath: '/pages/tabbar/my/my',
        text: '我的',
        iconPath: '/images/my.png',
        selectedIconPath: '/images/my-cur.png'
      }
    ]
  },
  tabbarSwitch(e){
    log(e)
    this.setData({current:e.detail.index})
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  
})
