// pages/tabbar/index/index.js
const app = getApp()
var API = require('../../../utils/api')
var {
  log
} = console
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_modal: true,
    score: 0,

    showList: [],
    activeTab: 'study',
    tabs: [{
      id: 'study',
      name: "学习",
    }, {
      id: 'work',
      name: "工作"
    }, {
      id: 'life',
      name: "生活"
    }],

    modal: false,
    add_modal: false,

    add_type: "study",


    actions: [{
      name: '完成',
      color: '#fff',
      fontsize: 30, //单位rpx
      width: 70, //单位px
      background: '#5677fc'
    }],

    types: [{
      id: 'study',
      name: '学习'
    }, {
      id: 'work',
      name: '工作'
    }, {
      id: 'life',
      name: '生活'
    }],

    currentId: '',
    currentName: '',
    currentCount: '',
    currentType: '',

    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  bindGetUserInfo(e) {
    log(e)
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        log(res.userInfo)
        wx.showToast({
          title: res.userInfo.nickName,
        })
      }
    })
  },
  //添加任务
  addMission() {
    this.setData({
      add_modal: true
    })
  },
  add_name_input(e) {
    this.setData({
      add_name: e.detail.value
    })
  },
  add_count_input(e) {
    this.setData({
      add_count: e.detail.value
    })
  },
  cancelAdd() {
    this.setData({
      add_modal: false,
      add_name: '',
      add_count: '',
      check: false
    })
  },
  //确定 添加任务 按钮
  add() {
    var {
      add_name,
      add_count,
      add_type
    } = this.data
    var that = this
    if (add_type == '' || add_type == null) {
      wx.showToast({
        title: '请选择任务类型',
        icon: 'none'
      })
    } else if (add_name == '' || add_name == null) {
      wx.showToast({
        title: '请输入任务名',
        icon: 'none'
      })
    } else if (add_count == '' || add_count == null) {
      wx.showToast({
        title: '请输入任务值',
        icon: 'none'
      })
    } else {
      //提交任务
      API.ajax('addMission', {
        add_name,
        add_count,
        add_type
      }, function (res) {
        if (res.status == 200) {
          wx.showToast({
            title: res.msg,
            duration: 1000
          })
          setTimeout(() => {
            that.setData({
              add_modal: false,
              add_name: '',
              add_count: '',
            })
            that.getList()
          }, 1000)
        }
      }, 'post')
    }
  },

  changeTab(e) {
    var activeTab = e.currentTarget.dataset.id


    var todoList = this.data.todoList
    //修改showList
    var showList = todoList.filter(e => {
      return e.type == activeTab
    })
    this.setData({
      showList,
      activeTab,
      add_type: activeTab
    })

  },
  tip(e) {
    log(e)

    this.setData({
      currentId: e.currentTarget.dataset.id,
      modal: true,
      currentName: e.currentTarget.dataset.name,
      currentCount: e.currentTarget.dataset.count,
      currentType: e.currentTarget.dataset.type

    })
  },
  cancel() {
    this.setData({
      modal: false
    })
  },
  handleClick() {
    var {
      currentId,
      currentName,
      currentCount,
      currentType
    } = this.data
    var that = this
    API.ajax('finish', {
      currentId,
      currentName,
      currentCount,
      currentType
    }, function (res) {
      if (res.status == 200) {
        wx.showToast({
          title: res.msg,
          duration: 1000
        })
        setTimeout(() => {
          that.getScore()
          that.setData({
            modal: false
          })
        }, 1000)
      }
    })
  },

  //获取任务列表
  getList() {
    var that = this
    wx.showLoading()
    API.ajax('getList', {}, function (res) {
      wx.hideLoading()
      if (res.status == 200) {
        var todoList = res.data.list
        var showList = todoList.filter(e => {
          return e.type == that.data.activeTab
        })

        that.setData({
          todoList,
          showList
        })
      }
      //使用post才是修改
    })
  },
  //获取积分
  getScore() {
    var that = this
    API.ajax('getScore', {}, function (res) {
      if (res.status == 200) {
        that.setData({
          score: res.score
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    //获取列表
    that.getList()

    //获取积分
    that.getScore()

    //是否有设置了的背景图片
    that.setData({
      bgImg: wx.getStorageSync('bgImg') ? wx.getStorageSync('bgImg'): '/images/bg.jpg'
    })
  },

})