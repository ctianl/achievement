// pages/tabbar/timeline/timeline.js
var Time = require('../../../utils/utils')
var API = require('../../../utils/api')

var {
    log
} = console
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        id:'',
        modal: false
    },
    getList() {
        var that = this
        log(Time.format(new Date()))
        //获取finishList
        var match = {
            study: '学习',
            work: '工作',
            life: '生活'
        }
        API.ajax('getFinishList', {}, function (res) {
            if (res.status == 200) {
                var list = res.list
                list = list.map(e => {
                    e.type = match[e.type]
                    e.time = Time.format(e.time)
                    return e
                })
                that.setData({
                    list
                })

            }
        })
    },
    cancel() {
        this.setData({
            modal: false
        })
    },
    del(e) {
        var id=e.currentTarget.dataset.id
        var count=e.currentTarget.dataset.count
        this.setData({
            modal: true,
            id,count
        })


    },
    handleClick() {
        var id=this.data.id
        var count=this.data.count
        var that=this
        API.ajax('delTimeline', {
            id,count
        }, function (res) {
            if (res.status == 200) {
                wx.showToast({
                    icon: "none",
                    title: res.msg,
                    duration: 1000
                })

                setTimeout(() => {
                    that.setData({
                        modal:false
                    })
                    that.getList()
                }, 1000)

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
        this.getList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})