var app = getApp();
var common = require("../../common/js/common.js");
Page({
  data: {
    articleList: {},
    videoList: {}
  },
  onReady: function () {
    console.log(app.globalData);
    this.queryArticle();    
    this.queryVideo();
    this.querySchool();
    this.test(); 
  },
  queryArticle: function (){
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax", { "pindex": 1,"psize": 1 }, function(data){
      that.setData({
        articleList: data[0]
      })
    })
  },
  queryVideo: function () {
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": 1, "psize": 1 }, function (data) {
      that.setData({
        videoList: data[0]
      })
    })
  },
  querySchool: function () {
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=basic&ac=sys&d=getParamByKey&keys=schoolSetting", {}, function (data) {
      console.log(data)
 
    })
  },
  test: function () {
    var that = this;
    //视频列表
     common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": 1, "psize": 1 }, function (data) {
    //单个视频
       // audition 非试听0  试听1 price 收费价格 ischarge 是否收费 非0  是1
       // 免费的就没有试听的，全部都能播放
       // 收费的试听视频才能播放，非试听视频需要购买了才能播放
    // common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=course&ac=cvideo&d=getCvideosParam&isNeadPager=false", { "vcourseid": 2 }, function (data) {
      console.log(data)
    })
  },
  ToArticleDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../news_detail/news_detail?id=' + dataSet.articleId
    })
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge
    })
  },
  ToMoreArticle: function(){
    wx.navigateTo({
      url: '../more_news/more_news?BarTitle=更多文章推荐'
    })
  },
  ToMoreVideo: function () {
    wx.navigateTo({
      url: '../video_list/video_list?BarTitle=更多在线课程'
    })
  }
})