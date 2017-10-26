var app = getApp();
Page({
   onLoad: function () {
     wx.setNavigationBarTitle({
       title: "基本信息"
     });
    var that = this;
    app.getUserInfo(function(data){
      var sex = "";
      switch (data.gender){
        case 0: sex = "未知"; break;
        case 1: sex = "男"; break;
        case 2: sex = "女"; break;
        default:break;
      }
      data.sex = sex;
      that.setData({
        userInfo:data
      })
    })
  }
})