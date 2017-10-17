var common = require("../../common/js/common.js");
Page({
  data: {
    class: ['@五年级一班', '@五年级二班', '@五年级三班', '@五年级四班'],
    subject: ['语文', '数学', '外语', '物理', '化学', '生物', '政治', '历史', '地理'],
    classindex: 0,
    subjectindex: 0 ,
    focus:false,
    title:"",
    info:"",
    bid:""   
  },
  onLoad:function(){
    var that =this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          bid: res.data.bid
        })
      }
    })
  },
  bindClassChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classindex: e.detail.value
    })
  },
  bindSubjectChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subjectindex: e.detail.value
    })
  },
  bindFocus: function () {
    this.setData({
      focus: true
    })
  },
  publishWork:function(){
    var that = this;
    
    common.requestServer("p=member&ac=task&d=addTaskInfo", 
      {
        "tid": that.data.bid,
        "title": that.data.title,
        "info": that.data.info
      }, 
      function (data) {
        if (data.status == "success"){
          common.showToast(data.msg, true);
        }else{
          common.showToast(data.msg, true);
        }
    })

  },
  getValue1:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  getValue2: function (e) {    
    this.setData({
      info: e.detail.value
    })
  }
})