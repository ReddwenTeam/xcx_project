var common = require("common/js/common.js");
var CODE_INFO = {};
App({
  onLaunch: function() {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    that.wxLogin();
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    that.getShareTitle();
  },
  wxLogin:function(){
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //code 换取 session_key
          common.requestServer("p=member&ac=member&d=memberLogin", { "code": res.code }, function (data) {
            if (data.openid) {
              CODE_INFO.openid = data.openid;
              wx.getUserInfo({
                success: function (res) {
                  //获取登录用户昵称等信息
                  var userInfo = res.userInfo;
                  CODE_INFO.nickName = userInfo.nickName;
                  CODE_INFO.avatarUrl = userInfo.avatarUrl;
                  CODE_INFO.province = userInfo.province;
                  CODE_INFO.city = userInfo.city;
                  CODE_INFO.country = userInfo.country;
                  CODE_INFO.gender = userInfo.gender;
                  //第三方服务器登录
                  common.requestServer("p=member&ac=member&d=gainMembersInfo", CODE_INFO, function (data) {
                    if (data.status == "success") {
                      that.memberid = data.memberid;
                      that.isMemberBinded(data.memberid);
                      wx.setStorage({
                        key: "openInfo",
                        data: {
                          openId: CODE_INFO.openid,
                          memberId: data.memberid,
                          nickName: CODE_INFO.nickName
                        }
                      })
                    } else {
                      common.showToast('网络出错，请稍后再试！')
                    }
                  })
                },
                fail: function () {
                  common.showToast('网络出错，请稍后再试！')
                }
              })
            } else {
              common.showToast('网络出错，请稍后再试！')
            }
          })
        } else {
          common.showToast('网络出错，请稍后再试！')
        }
      },
      fail: function () {
        common.showToast('网络出错，请稍后再试！')
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this;
    if (that.globalData.userInfo) {
      if (typeof cb == "function"){
        cb(that.globalData.userInfo)
      }
    } else {
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          if (typeof cb == "function") {
            cb(that.globalData.userInfo)
          }
        }
      })
    }
  },
  isMemberBinded(member){
    common.requestServer("p=member&ac=binding&d=getIsBinding" , { "memberid": member}, function (data) {
        if(data.status == "success"){
          if (data.binding == "error"){
            wx.navigateTo({
              url: '../user_bind/user_bind'
            })
          } else if (data.binding == "success"){
            wx.setStorage({
              key: "bindingInfo",
              data: {
                bdtype: data.bindingInfo.bdtype,
                bid: data.bindingInfo.bid,
                memberid: member
              }
            })
          }
        }else{
          common.showToast('网络出错，请稍后再试！')
        }
    })
  },
  globalData: {
    userInfo:null
  },
  getShareTitle:function(){
    var that = this;
    common.requestServer("p=basic&ac=share&d=getShareParam", {}, function (data) {
      that.shareTitle = data.shareTitle;
      that.shareAvatar = data.shareAvatar;
    })
  }
})