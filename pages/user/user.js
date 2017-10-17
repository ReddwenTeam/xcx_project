var common = require("../../common/js/common.js");
var app = getApp();
Page({
  data:{
    role:"youke",
  },
  onShow:function(){
    this.getRole();
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    });
  },
  getRole:function(){
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        var data = res.data;
        if (data.bdtype == 1){
          that.setData({
            role: 'laoshi'
          }) 
        } else if (data.bdtype == 2) {
          that.setData({
            role: 'jiazhang'
          })
        }
      }
    })
  },
  deleteBinding:function(){
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        var data = res.data;
        switch (data.bdtype){
          //老师
          case 1: requestUnBind({ "bdtype": data.bdtype, "memberid": data.memberid, "bid": data.bid });break;
          //家长
          case 2: requestUnBind({ "bdtype": data.bdtype, "memberid": data.memberid }); break;
          default:break;
        }
        function requestUnBind(param){
          common.requestServer("p=member&ac=binding&d=deleteBinding", param , function (data) {
            if (data.status == "success") {
              common.showToast(data.msg, true);
              that.setData({
                role: "youke"
              });
              wx.removeStorage({
                key: 'bindingInfo',
                success: function (res) {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index'
                    });
                  }, 2000)
                }
              })
            } else {
              common.showToast(data.msg)
            }
          });
        }
      }
    })
  },
  ToUserBind: function(){
    wx.navigateTo({
      url: '../user_bind/user_bind'
    })
  },
  ToNoticeList: function () {
    wx.navigateTo({
      url: '../notice_list/notice_list?BarTitle=校园通知'
    })
  }
})