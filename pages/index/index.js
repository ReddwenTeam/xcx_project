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
  //首页文章推荐
  queryArticle: function (){
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax", { "pindex": 1,"psize": 1 }, function(data){
      that.setData({
        articleList: data[0]
      })
    })
  },
  //首页文章详情
  queryArticleDetail: function (id) {
    var that = this;
    console.log(id)
    // common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticParam&f=ajax", {"id": id}, function (data) {
    //   console.log(data)
    // })
  }
  
})