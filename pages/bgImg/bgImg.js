// pages/bgImg/bgImg.js
var {
  log
} = console
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '',
    
  },
  set() {
    let that = this;

    wx.chooseImage({
      count: that.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 选择图片后的完成确认操作
        // that.setData({
        //   bgImg: res.tempFilePaths[0]
        // });
        wx.setStorageSync('tempImg', res.tempFilePaths[0])

        wx.navigateTo({
          url: '/pages/cropper/cropper',
        })
      }
    })
  },
  default () {
    this.setData({
      bgImg: '/images/bg.jpg'
    });
    wx.setStorageSync('bgImg', '/images/bg.jpg')

  },


  onLoad: function (options) {
   
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //是否有本地储存
    var bgImg = wx.getStorageSync('bgImg') ? wx.getStorageSync('bgImg') : '/images/bg.jpg'
    this.setData({
      bgImg
    })

  },


})