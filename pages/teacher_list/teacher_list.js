var common = require("../../common/js/common.js");
Page({
  data: {
    teacherList: [],
  },
  onReady: function () {
    var _this = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=teacher&ac=teacher&d=getCountrysParam", {}, function (data) {
      _this.setData({
        teacherList: data,
      })
    });
  },
})