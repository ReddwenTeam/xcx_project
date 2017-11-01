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
      // if (data.mobile.length>0){
      //   data.Tmobile = data.mobile.substring(0, 3) + "****" + data.mobile.substring(data.mobile.length - 4)
      // }else{
      //   data.Tmobile = "暂无"
      // }
      // if (data.tel.length > 0) {
      //   data.Ttel = data.tel.substring(0, 3) + "****" + data.tel.substring(data.tel.length - 4)
      // } else {
      //   data.Ttel = "暂无"
      // }
      that.setData({
        info: data
      });
      var content = "<div style=\"word-break:normal;\" class='fs-28 color-6 p-paragraph'>" + data.info + "</div>";
      common.formatHtml("article", "html", content, that, '10');
    });
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.redirectTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&isbuy=' + dataSet.videoIsbuy
    })
  },
})