var common = require("../../common/js/common.js");
var app = getApp();
Page({
  data: {
    pageNum:0,
    tempName:"jiazhang",
    teacherName:"",
    teacherCode:"",
  },
  onLoad: function (param) {
    var that = this;
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    });
  },
  tapCheck: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.setData({
      pageNum: dataSet.pageNum
    });
    if (dataSet.pageNum == 0){
      this.setData({
        tempName: "jiazhang"
      });
    }else{
      this.setData({
        tempName: "laoshi"
      })
    }
  },
  bindInfo : function(){
    var that = this;
    wx.getStorage({
      key: 'openInfo',
      success: function (res) {
        var openInfo = res.data;
        common.requestServer("p=member&ac=binding&d=saveBindingParam", { "code": "", "name": "", "memberid": openInfo.memberId, "type":"patriarch"}, function (data) {
          if (data.status == "success"){
            common.showToast(data.msg, true);
            wx.setStorage({
              key: "bindingInfo",
              data: {
                bdtype: data.bindingInfo.bdtype,
                bid: data.bindingInfo.bid,
                memberid: openInfo.memberId
              }
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
          }else{
            common.showToast(data.msg)
          }
        });
      }
    })    
  },
  bindInput1:function(e){
    this.setData({
      teacherName: e.detail.value
    })
  },
  bindInput2: function (e) {
    this.setData({
      teacherCode: e.detail.value
    })
  },
  bindTeacherInfo:function(){
    var that = this;
    var code = this.data.teacherCode;
    var name = this.data.teacherName;
    wx.getStorage({
      key: 'openInfo',
      success: function (res) {
        var openInfo = res.data;
        common.requestServer("p=member&ac=binding&d=saveBindingParam", { "code": code, "name": name, "memberid": openInfo.memberId, "type": "teacher" }, function (data) {
          if (data.status == "success"){
            common.showToast(data.msg,true);
            wx.setStorage({
              key: "bindingInfo",
              data: {
                bdtype: data.bindingInfo.bdtype,
                bid: data.bindingInfo.bid,
                memberid: openInfo.memberId
              }
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
          }else{
            common.showToast(data.msg)
          }
        });
      }
    }) 
  }
})