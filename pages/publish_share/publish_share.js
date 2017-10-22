var common = require("../../common/js/common.js");
Page({
  data: {
    focus: false,
    info: "",
    bid: "",
    openId: "",
    memberid:"",
    thumbs:"",
    videourl: ""
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: "发布朋友圈"
    });
    wx.getStorage({
      key: "openInfo",
      success: function (res) {
        that.setData({
          openId: res.data.openId
        })
      }
    })
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          bid: res.data.bid,
          memberid: res.data.memberid
        })
      }
    })
  },
  bindFocus: function () {
    this.setData({
      focus: true
    })
  },
  publishWork: function () {
    var that = this;
    if (that.data.info.length > 0){
      common.requestServer("p=member&ac=exchange&d=savaExchangeParam",
        {
          "memberid": that.data.memberid,
          "openid": that.data.openId,
          "bid": that.data.bid,
          "info": that.data.info,
          "thumbs": that.data.tempFilePaths
        },
        function (data) {
          console.log(data)
          if (data.status == "success") {
            common.showToast("朋友圈发布成功", true);
            setTimeout(function () {
              wx.navigateBack()
            }, 2000);
          } else {
            common.showToast("朋友圈发布失败");
          }
        })
    }else{
      common.showToast("请输入文字");
    }
  },
  getValue2: function (e) {
    this.setData({
      info: e.detail.value
    })
  },
  chooseImage : function(){
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({
            tempFilePaths: res.tempFilePaths
        })

        // common.requestServer("p=comm&ac=upload&d=uploadIMG",{
        //  // http://tmp/wx1ca81df889bc6600.o6zAJs59VgSVQgYuZNJAEsM7W_ro.9e4109c053466168cbbc94bbc9c225bc.png

        // },function(data){
        //   console.log(data)

        // })
      }
    })
  }
})