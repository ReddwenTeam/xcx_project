var common = require("../../common/js/common.js");
Page({
  data:{
    info:{}
  },
  onLoad: function (param) {
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    this.queryDetail(param.id);
  },
  queryDetail: function (id) {
    var that = this;
    common.requestServer("p=teacher&ac=teacher&d=getTeacherParam", {
      'id': id
    }, function (data) {
      that.setData({
        info: data
      });
      var content = "<div style=\"word-break:normal;\" class='fs-28 color-6 p-paragraph'>" + data.info + "</div>";
      common.formatHtml("article", "html", content, that);
    });
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&isbuy=' + dataSet.videoIsbuy
    })
  },
})