var common = require("../../common/js/common.js");
Page({
  data:{
    articleInfo:{}
  },
  onLoad: function (param) {
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticParam&f=ajax", { "id": param.id }, function (data) {
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