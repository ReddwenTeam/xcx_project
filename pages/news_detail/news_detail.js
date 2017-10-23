var common = require("../../common/js/common.js");
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
    common.formatHtml("article", "html", content, that);
  }
})