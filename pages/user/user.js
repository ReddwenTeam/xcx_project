
var common = require("../../common/js/common.js");
Page({
  data:{
    role:"laoshi"
  },
  onReady:function(){
    this.getRole();
  },
  getRole:function(){
    var that = this;
    wx.getStorage({
      key: "roles",
      success: function (res) {
        console.log(res);
        that.setData({
          role: res.data
        }) 
      }
    })
  }

})