var common = require("../../common/js/common.js");
var schoolInfo;
Page({
  data:{
    schoolList: {}
  },
  onLoad: function (param) {
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    schoolInfo = param.schoolInfo;
    this.queryDetail();
  },
  queryDetail: function(){
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=basic&ac=sys&d=getParamByKey&keys=schoolSetting", {}, function (data) {
      that.setData({
        schoolList: data
      });
      that.showDetail();
    })
  },
  showDetail: function () {
    var that = this;
    switch (schoolInfo){
      case '1': that.showPanel(that.data.schoolList.shInfo); break;
      case '2': that.showPanel(that.data.schoolList.stInfo); break;
      default:break;
    }
  },
  showPanel: function (info){
    var that = this;
    var content = "<div style=\"word-break:normal;\" class='fs-26 color-0 p-paragraph'>" + info + "</div>";
    common.formatHtml("article", "html", content, that);
  }
})