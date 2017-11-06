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
          appMemberid: res.data.memberid,
          comBdtype: res.data.bdtype,
          comBid: res.data.bid
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
    dataSet.parentid = 0;
    that.setData({
      fixedcomment: true,
      setAuto:true,
      showCbtn : false,
      commentOneInfo: dataSet,
      commentid: dataSet.commentId,
      parentid: dataSet.parentId,
      MTtomemberid: dataSet.toMemberid
    });
  },
  queryComment: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    that.setData({
      queryId: dataSet.queryId,
      commentList: [],
      isopen: true
    });
    that.queryCommentEvent(dataSet.queryId);
  },
  closeComment:function(){
    this.setData({
      isopen: false
    });
  },
  queryCommentEvent: function (queryId){
    var that = this;
    common.requestServer("p=member&ac=evaluate&d=getEvaluateParamByEid", { "exchangeid": queryId }, function (data) {
      if (data.status == "success") {
        if (data.data.length == 0) {
          that.setData({
            commenttype: true
          });
        } else {
          that.setData({
            commenttype: false,
            commentList: data.data
          });
        }
      }
    });
  },
  fixedbindblur:function(){
    this.setData({
      fixedcomment: false,
      showCbtn: false
    });
  },
  getMsg: function (e) {
    this.setData({
      msgInput: e.detail.value
    })
  },
  sendMsg: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    if (that.data.msgInput.length == 0){
      common.showToast("请输入评论！");
    }else{
      if (dataSet.commentType){
        //回复
        var tomemberid = that.data.MTtomemberid;
        var memberid = that.data.appMemberid;
        var parentid = that.data.parentid;
      }else{
        //评论
        var tomemberid = that.data.MTtomemberid;
        var memberid = that.data.appMemberid;
        var parentid = that.data.parentid;
      }
      saveEvaluateParam(memberid, tomemberid, parentid)
    }

    function saveEvaluateParam(memberid, tomemberid,parentid){
      common.requestServer("p=member&ac=evaluate&d=saveEvaluateParam", {
        "exchangeid": that.data.commentid,
        "bdid": that.data.comBid,
        "bdtype": that.data.comBdtype,
        "info": that.data.msgInput,
        "memberid": memberid,
        "parentid": parentid,
        "tomemberid": tomemberid,
      }, function (data) {
        if (data.status == "success") {
          common.showToast("评论成功", true);
          that.queryCommentEvent(that.data.queryId);
        }
      });
    }
  },
  reComment: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.setData({
      fixedcomment: true,
      setAuto: true,
      showCbtn: false,
      reComment:true,
      commentid: dataSet.commentId,
      parentid: dataSet.parentId,
      MTtomemberid: dataSet.toMemberid
    })
  },
  addPraise: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    that.setData({
      showCbtn: false
    });
    common.requestServer("p=member&ac=praise&d=addPraiseParam", { "exchangeid": dataSet.praiseId, "memberid": that.data.appMemberid }, function (data) {
      if (data.status == "success") {
        common.showToast("点赞成功", true);
        curShareList = [];
        curPage = 1;
        that.queryShareList(curPage);
      }else{
        common.showToast(data.msg);
      }
    });

  }
})