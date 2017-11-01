var common = require("../../common/js/common.js");
var app = getApp();
var pageindex = Page({
  data: {
    articleList: {},
    videoList: {},
    schoolList: {}
  },
  onReady: function () {
    var that = this;
    that.queryArticle();    
    that.queryVideo();
    that.querySchool();
    app.getUserInfo(function(data){
      that.setData({
        nickName: data.nickName
      })
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "payReload",
      success: function (res) {
        if (res.data) {
          that.queryVideo();
          wx.removeStorage({ key: 'payReload' })
        }
      }
    })
  },
  queryArticle: function (){
    var that = this;
    common.requestServer("p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax", { "pindex": 1,"psize": 1 }, function(data){
      that.setData({
        articleList: data[0]
      })
    })
  },
  queryVideo: function () {
    var that = this;
    common.requestServer("p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": 1, "psize": 1 }, function (data) {
      that.setData({
        videoList: data[0]
      })
    })
  },
  querySchool: function () {
    var that = this;
    common.requestServer("p=basic&ac=sys&d=getParamByKey&keys=schoolSetting", {}, function (data) {
      app.friendAvatar = data.friendAvatar;
      that.setData({
        schoolList: data
      })
    })
  },
  ToArticleDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../news_detail/news_detail?id=' + dataSet.articleId + '&BarTitle=' + dataSet.articleName
    })
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&isbuy=' + dataSet.videoIsbuy + '&xnumber=' + dataSet.videoXnumber
    })
  },
  ToSchoolDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../school_detail/school_detail?schoolInfo=' + dataSet.schoolInfo + '&BarTitle=' + dataSet.schoolName
    })
  },
  ToTeacherDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../teacher_list/teacher_list?BarTitle=' + dataSet.schoolName
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
  },
  onShareAppMessage:function(){
    return {
      title: app.shareTitle,
      imageUrl: app.shareAvatar,
      path: '/pages/index/index',
      success: function (res) {
        common.showToast("转发成功！", true);
      },
      fail: function (res) {
        common.showToast("转发失败");
      }
    }   
  }
})