var common = require("../../common/js/common.js");
var curVideoList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    video_list: []
  },
  onLoad: function (param) {
    curVideoList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  onReady: function () {
    this.queryVideoList(curPage);
  },
  queryVideoList: function (page) {
    var that = this;
    common.requestServer("p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": page, "psize": 3 }, function (data) {
      if (data.length == 0) {
        if (page == 1) {
          that.setData({
            video_list: [],
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
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&xnumber=' + dataSet.videoXnumber
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
  formSubmit: function (event) {
    var formId = event.detail.formId;
    var dataSet = event.detail.target.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge + '&xnumber=' + dataSet.videoXnumber
    })
    common.requestServer("p=member&ac=formid&d=saveFormidParam", { "memberid": app.memberid, "formid": formId });
  }
})