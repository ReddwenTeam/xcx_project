//app.js
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
          //发起网络请求
       
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.AllInfo = res;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
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
    //AllInfo: {},
    //userInfo: {}
  }
})
