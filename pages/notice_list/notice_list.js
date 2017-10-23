var common = require("../../common/js/common.js");
var curNoticeList = [], curPage = 1;
Page({
  data: {
    notice_list: []
  },
  onLoad: function (param) {
    curNoticeList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  onReady: function () {
    this.queryNoticeList(curPage);
  },
  queryNoticeList: function (page) {
    var that = this;
    common.requestServer("p=news&ac=news&d=getNewsParam&isNeadPager=true&f=ajax", { "pindex": page, "psize": 6 }, function (data) {
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
          curNoticeList.push(item);
        });
        that.setData({
          notice_list: curNoticeList
        });
      }
    })
  },
  ToNoticeDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../news_detail/news_detail?id=' + dataSet.noticeId + '&BarTitle=' + dataSet.noticeName + '&type=1'
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
    this.queryNoticeList(curPage);
  }
})