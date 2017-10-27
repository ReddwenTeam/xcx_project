var common = require("../../common/js/common.js");
var curVideoList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    videoList: [],
    part: "quanbu"
  },
  onLoad: function (param) {
    curVideoList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: "课程列表"
    });
    this.queryVideoList(curPage);
  },
  queryVideoList: function (page) {
    var that = this;
    var url = "";
    switch (that.data.part) {
      case 'quanbu':
        url = "p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true";
        break;
      case 'goumai':
        url = "p=course&ac=vcourse&d=getBuycoursesParam&isNeedPager=true";
        break;
      default: break;
    }
    common.requestServer(url, { "pindex": curPage, "psize": 5, "memberid": app.memberid, }, function (data) {
      if (data.length == 0) {
        if (page == 1) {
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "暂无数据"
            }
          });
        } else {
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "没有更多数据"
            }
          });
          curPage--;
        }
      } else {
        data.forEach(function (item) {
          item.formatTime = common.formatTime(item.createtime, 'Y-M-D');
          curVideoList.push(item);
        });
        that.setData({
          videoList: curVideoList,
          loading: {
            status: false,
            load: false,
            text: ""
          }
        });
      }
    })
  },
  tapCheck: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.setData({
      pageNum: dataSet.pageNum
    });
    if (dataSet.pageNum == 0) {
      this.setData({
        part: "quanbu"
      });
    } else {
      this.setData({
        part: "goumai"
      })
    }
    curVideoList = [];
    curPage = 1;
    this.queryVideoList(curPage);
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&isbuy=' + dataSet.videoIsbuy
    })
  },
  onReachBottom: function () {
    this.setData({
      loading: {
        status: true,
        load: true,
        text: "加载中..."
      }
    });
    curPage++;
    this.queryVideoList(curPage);
  }
})