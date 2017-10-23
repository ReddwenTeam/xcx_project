var common = require("../../common/js/common.js");
var showImg = [];
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
    showImg = [];
    wx.setNavigationBarTitle({
      title: "发布朋友圈"
    });
    wx.getStorage({
      key: "openInfo",
      success: function (res) {
        that.setData({
          openId: res.data.openId,
          nickName: res.data.nickName
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
          "thumbs": showImg
        },
        function (data) {
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
    console.log(showImg.length)
    if(showImg.length < 9){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.uploadFile({
            url: 'https://weiqing.zqkj.site/addons/star_school/app/index.php?p=comm&ac=upload&d=uploadIMG',
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              'user': res.tempFilePaths[0]
            },
            success: function (res) {
              var data = res.data;
              if (res.data == "error") {
                common.showToast("图片上传失败");
              } else {
                showImg.push(data);
                that.setData({
                  tempFilePaths: showImg
                })
              }
            }
          })
        }
      })
    }else{
      common.showToast("只能选择9张照片");
    }
  },
  infoClose:function(event){
    var dataSet = event.currentTarget.dataset, that = this;
    Array.prototype.remove = function (index) {
      this.splice(index, 1);
    };
    var emp = showImg;
    emp.remove(dataSet.deleteIndex);
    that.setData({
      tempFilePaths: showImg
    });
  }
})