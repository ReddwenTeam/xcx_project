var common = require("../../common/js/common.js");
Page({
  data: {
    pageNum:0,
    tempName:"jiazhang",
    teacherName:"",
    teacherCode:""
  },
  onLoad: function (param) {
    console.log(param)
    this.setData({
      avatarUrl: param.avatarUrl,
      nickName: param.nickName
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
        console.log(res)
        var openInfo = res.data;
        common.requestServer("p=member&ac=binding&d=saveBindingParam", { "code": openInfo.openId, "name": openInfo.nickName, "memberid": openInfo.memberId, "type":"parent"}, function (data) {
          console.log(data);
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
    var code = this.data.teacherCode;
    var name = this.data.teacherName;
    console.log(name+"-----"+code);
    // common.requestServer("p=member&ac=binding&d=saveBindingParam", { "code": openInfo.openId, "name": openInfo.nickName, "memberid": openInfo.memberId, "type": "teacher" }, function (data) {
    //   console.log(data);
    // });
  }
})