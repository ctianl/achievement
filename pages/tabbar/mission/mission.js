// pages/tabbar/mission/mission.js
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
        add_modal: false,
        maskClose: true,

        edit_modal:false,

        todoList: [],
        name: '',
        count: 0,
        id: 0,
        type: '',

        add_name: '',
        add_count: '',
        add_type: "study",

        edit_name: '',
        edit_count: '',
        edit_type: '',

        //是否批量操作
        isBatch: false,

        //选择删除的
        select: [],

        check: false,

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
    edit_name_input(e) {
        this.setData({
            edit_name: e.detail.value
        })
    },
    edit_count_input(e) {
        this.setData({
            edit_count: e.detail.value
        })
    },
    radioChange(e) {
        this.setData({
            add_type: e.detail.value
        })
    },
    edit_radioChange(e){
        this.setData({
            edit_type: e.detail.value
        })
    },
    cancelAdd(){
        this.setData({
            add_modal: false,
            add_name: '',
            add_count: '',
            check:false
        })
    },
    //确定 添加任务 按钮
    handleClick() {
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

    batch() {
        this.setData({
            isBatch: !this.data.isBatch
        })
    },
    //打开任务 可能修改任务
    openMsg(e) {
        var {
            id,
            name,
            count,
            type
        } = e.currentTarget.dataset
        this.setData({
            edit_modal: true,

            edit_id:id,
            edit_name: name,
            edit_count: count,
            edit_type: type
        })
    },
    edit(){
        var {
            edit_id,
            edit_name,
            edit_count,
            edit_type
        } = this.data
        var that = this
        if (edit_type == '' || edit_type == null) {
            wx.showToast({
                title: '请选择任务类型',
                icon: 'none'
            })
        } else if (edit_name == '' || edit_name == null) {
            wx.showToast({
                title: '请输入任务名',
                icon: 'none'
            })
        } else if (edit_count == '' || edit_count == null) {
            wx.showToast({
                title: '请输入任务值',
                icon: 'none'
            })
        } else {
            //提交任务
            API.ajax('editMission', {
                edit_id,
                edit_name,
                edit_count,
                edit_type
            }, function (res) {
                if (res.status == 200) {
                    wx.showToast({
                        title: res.msg,
                        duration: 1000
                    })
                    setTimeout(() => {
                        that.setData({
                            edit_modal: false,
                            edit_name: '',
                            edit_count: '',
                            edit_id:''
                        })
                        that.getList()
                    }, 1000)
                }
            }, 'post')
        } 
    },
    cancelEdit() {
        log('有时？')
        this.setData({
            edit_modal: false,
            edit_name: '',
            edit_count: '',
            edit_type: ''
        })
    },
    //选择 任务 删除
    checkboxChange(e) {
        this.setData({
            select: e.detail.value
        })
    },
    //获取任务列表
    getList() {
        var that = this
        wx.showLoading()
        API.ajax('getList', {}, function (res) {
            wx.hideLoading()
            if (res.status == 200) {
                that.setData({
                    todoList: res.data.list
                })
            }
            //使用post才是修改
        })
    },
    delMission(e) {
        var delList = this.data.select
        var that = this
        if (delList.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '请选择任务',
            })
        } else {
            //提示确认删除
            API.ajax('delMission', {
                delList
            }, function (res) {
                if (res.status == 200) {
                    wx.showToast({
                        icon: "none",
                        title: res.msg,
                        duration: 1000
                    })

                    setTimeout(() => {
                        that.setData({
                            check: false
                        })

                        that.getList()
                    }, 1000)

                }
            }, 'post')

        }

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