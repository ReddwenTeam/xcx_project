var common = require("../../common/js/common.js");
var curVideoList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    video_list: [],
    isbuy: "error"
  },
  onLoad: function () {
    curVideoList = [];
    curPage = 1;
  },
  onReady: function () {
    this.queryVideoList(curPage);
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "payReload",
      success: function (res) {
        if (res.data){
          curVideoList = [];
          curPage = 1;
          that.queryVideoList(curPage);
          wx.removeStorage({ key: 'payReload' })
        }
      }
    })
  },
  queryVideoList: function (page) {
    var that = this;
    common.requestServer("p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": page, "psize": 3, "memberid": app.memberid }, function (data) {
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
          var temp = {
            title: item.name,
            sub_title: item.breif,
            tag: "",
            duration: "",
            id: item.id,
            poster_src: item.picarr,
            price: item.price,
            ischarge: item.ischarge,
            isbuy: item.isbuy,
            xnumber: item.xnumber
          }
          curVideoList.push(temp);
        });
        that.setData({
          video_list: curVideoList,
          loading: {
            status: false,
            load: false,
            text: ""
          }
        });
      }
    })
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&isbuy=' + dataSet.videoIsbuy + '&xnumber=' + dataSet.videoXnumber
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
  },
  onShareAppMessage: function () {
    return {
      title: app.shareTitle,
      path: '/pages/index_video/index_video',
      success: function (res) {
        // 转发成功
        common.showToast("转发成功！", true);
      },
      fail: function (res) {
        // 转发失败
        common.showToast("转发失败");
      }
    }
  }
})