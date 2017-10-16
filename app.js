//app.js
var common = require("common/js/common.js");
App({
  onLaunch: function() {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        if (res.code) {
          //code 换取 session_key
          common.requestServer("p=member&ac=member&d=memberLogin", { "code": res.code }, function (data) {
            var CODE_INFO = {};
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
                console.log(CODE_INFO)
                common.requestServer("p=member&ac=member&d=gainMembersInfo", CODE_INFO, function (data) {
                  console.log(data)
                })
              }
            })
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo:null
  }
})
