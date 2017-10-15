var common = require("../../common/js/common.js");
Page({
  data: {
    teacherList: [],
  },
  onLoad: function (param) {
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  onReady: function () {
    var _this = this;
    common.requestServer("p=teacher&ac=teacher&d=getCountrysParam", {}, function (data) {
      _this.setData({
        teacherList: data,
      })
    });
  },
  ToTeacherDetail: function (event){
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../teacher_detail/teacher_detail?id=' + dataSet.teacherId + '&BarTitle=' + dataSet.teacherName
    })
  }
})