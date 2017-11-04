var common = require("../../common/js/common.js");
var curShareList = [], curPage = 1;
var app = getApp();
Page({
  data: {
    share_list: [],
    appMemberid:"",
    sendTag:false,
    fixedcomment: false
  },
  onLoad: function () {
    var that = this;
    curShareList = [];
    curPage = 1;
    that.setData({
      friendAvatar: app.friendAvatar
    });
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
          share_list: curShareList,
          loading: {
            status: false,
            load: false,
            text: ""
          }
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
  },
  onShareAppMessage: function () {
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
  },
  comment: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    that.setData({
      commentId: dataSet.commentId,
      showCbtn: true
    });
  },
  commentinput: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    that.setData({
      fixedcomment: true,
      setAuto:true,
      showCbtn : false
    });
  },
  queryComment: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    that.setData({
      queryId: dataSet.queryId
    });
    common.requestServer("p=member&ac=evaluate&d=getEvaluateParamByEid", { "exchangeid": dataSet.queryId}, function (data) {
      console.log(data)
      if (data.status == "success") {
        console.log(data.data)
        that.setData({
          commentList: data.data
        });
      }
    });
  },
  fixedbindblur:function(){
    this.setData({
      fixedcomment: false,
      showCbtn: false
    });
  },
  sendMsg:function(){
    // common.requestServer("p=member&ac=evaluate&d=saveEvaluateParam", {
    //   "exchangeid": dataSet.commentId,
    //   "memberid": dataSet.commentMemberid,
    //   "bdid": dataSet.commentBdid,
    //   "bdtype": dataSet.commentBdtype,
    //   "info": "测试内容",
    //   "parentid": "0",
    //   // "tomemberid": 0,
    // }, function (data) {
    //   console.log(data)
    //   if (data.status == "success") {

    //   }
    // });
  }
})