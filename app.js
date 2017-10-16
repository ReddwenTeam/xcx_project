var common = require("common/js/common.js");
var CODE_INFO = {};
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
                console.log(CODE_INFO)
                //common.setStorage("roles", "xingzheng");
                //第三方服务器登录
                common.requestServer("p=member&ac=member&d=gainMembersInfo", CODE_INFO, function (data) {
                  if (data.status == "success"){
                    that.isMemberBinded(data.memberid);
                    wx.setStorage({
                      key: "openInfo",
                      data: {
                        openId: CODE_INFO.openid,
                        memberId: data.memberid,
                        nickName: CODE_INFO.nickName
                      }
                    })
                  }
                })
              }
            })
          })
        } else {
          // console.log('获取用户登录态失败！' + res.errMsg)
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
  isMemberBinded(member){
    common.requestServer("p=member&ac=binding&d=getIsBinding&memberid=" + member, {}, function (data) {
        if(data.status == "success"){
          if (data.binding == "error"){
            wx.navigateTo({
              url: '../user_bind/user_bind?avatarUrl=' + CODE_INFO.avatarUrl + '&nickName=' + CODE_INFO.nickName
            })
          }
        }
    })
  },
  globalData: {
    userInfo:null
  }
})
