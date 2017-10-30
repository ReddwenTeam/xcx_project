var common = require("../../common/js/common.js");
var app = getApp();
Page({
  data:{
    articleInfo:{}
  },
  onLoad: function (param) {
    var that = this;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    var url = "p=news&ac=artic&d=getArticParam&f=ajax";
    if (param.type){
      url = "p=news&ac=news&d=getNewParam";
    }
    common.requestServer(url, { "id": param.id }, function (data) {
      data.formatTime = common.formatTime(data.createtime, 'Y-M-D');
      that.setData({
        articleInfo: data
      });
      that.showInfo(data.info);
    })
  },
  showInfo : function(info){
    var that = this;
    var content = "<div style=\"word-break:normal;\" class='fs-26 color-0 p-paragraph'>" + info + "</div>";
    common.formatHtml("article", "html", content, that, '20');
  },
  aldShare: function (e) {
    common.aldShare(e,this);
  },
  onShareAppMessage: function () {
    return {
      title: app.shareTitle,
      imageUrl: app.shareAvatar,
      path: '/pages/index/index',
      success: function (res) {
        common.showToast("转发成功！", true);
      },
      fail: function (res) {
        common.showToast("转发失败");
      }
    }
  }
})