var app = getApp();
var common = require("../../common/js/common.js");
Page({
  data: {
    articleList: {}
  },
  onReady: function () {
    console.log(app.globalData);
    this.queryArticle();    
  },
  queryArticle: function (){
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax", { "pindex": 1,"psize": 1 }, function(data){
      that.setData({
        articleList: data[0]
      })
    })
  },
  ToArticleDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../news_detail/news_detail?id=' + dataSet.articleId
    })
  }
})