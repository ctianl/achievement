var {log}=console
Page({
    data: {
        bgImg:'',
        width:750,//宽度
        height: 170,//高度
    },
    onLoad: function (options) {
    //获取到image-cropper实例
        this.cropper = this.selectComponent("#image-cropper");
        //开始裁剪
   
        var bgImg= wx.getStorageSync('tempImg')
        this.setData({
            bgImg
        });
  
    },
    cropperload(e){
        console.log("cropper初始化完成");
    },
    loadimage(e){
        console.log("图片加载完成",e.detail);
        wx.hideLoading();
        //重置图片角度、缩放、位置
        this.cropper.imgReset();
    },
    clickcut(e) {
        console.log(e.detail);
        //点击裁剪框阅览图片
        wx.previewImage({
            current: e.detail.url, // 当前显示图片的http链接
            urls: [e.detail.url] // 需要预览的图片http链接列表
        })
    },
    cancel(){
        wx.navigateBack({
            delta: -1
        })
    },
    finish(){
        this.cropper.getImg((obj) => {
            wx.setStorageSync('bgImg', obj.url)
            wx.navigateBack({
                delta: -1
            })
        });
    }
})