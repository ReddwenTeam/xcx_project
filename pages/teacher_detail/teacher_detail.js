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
      console.log(data);
      that.setData({
        info: data
      })
    });
  }
})