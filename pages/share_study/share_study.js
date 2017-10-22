var common = require("../../common/js/common.js");
var curShareList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    share_list: []
  },
  onLoad: function () {
    var that = this;
    curShareList = [];
    curPage = 1;
    app.getUserInfo(function(data){
      that.setData({
        getUserInfo: data
      });
    });
  },
  onReady: function () {
    this.queryShareList(curPage);
  },
  queryShareList: function (page) {
    var that = this;
    common.requestServer("p=member&ac=exchange&d=getExchangesParam", { "pindex": page, "psize": 5 }, function (data) {
      console.log(data);
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
          curShareList.push(item);
        });
        that.setData({
          share_list: curShareList
        });
      }
    })
  },
  ToPublishShare: function (event) {
    wx.navigateTo({
      url: '../publish_share/publish_share'
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
    this.queryShareList(curPage);
  }
})