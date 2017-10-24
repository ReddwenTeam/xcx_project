var common = require("../../common/js/common.js");
var curShareList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    share_list: [],
    appMemberid:""
  },
  onLoad: function () {
    var that = this;
    curShareList = [];
    curPage = 1;
    that.queryShareList(curPage);
    app.getUserInfo(function(data){
      that.setData({
        getUserInfo: data
      });
    });
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          memberid: res.data.memberid,
          appMemberid: res.data.memberid
        })
      }
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'shareReload',
      success: function (res) {
        if(res.data){
          curShareList = [];
          curPage = 1;
          that.queryShareList(curPage);
          wx.removeStorage({key: 'shareReload'})
        }
      }
    })
  },
  queryShareList: function (page) {
    var that = this;
    common.requestServer("p=member&ac=exchange&d=getExchangesParam", { "pindex": page, "psize": 5 }, function (data) {
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
          item.formatTime = common.formatTime(item.createtime, 'Y-M-D  h:m:s');
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
  },
  deleteOne:function(event){
    var dataSet = event.currentTarget.dataset, that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该朋友圈么？',
      success: function (res) {
        if (res.confirm) {
          common.requestServer("p=member&ac=exchange&d=deleteExchangeParam", { "memberid": that.data.memberid, "id": dataSet.deleteId }, function (data) {
            if (data.status == "success"){
              common.showToast(data.msg, true);
              curShareList = [];
              curPage = 1;
              that.queryShareList(curPage);
            }
          });
        }
      }
    })
  },
  previewImage: function (event){
    var dataSet = event.currentTarget.dataset, that = this;
    var imgItem = dataSet.imgItem, imgIndex = dataSet.imgIndex;
    wx.previewImage({
      current: imgItem[imgIndex],
      urls: imgItem
    })
  }
})