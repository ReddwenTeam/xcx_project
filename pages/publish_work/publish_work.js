var common = require("../../common/js/common.js");
Page({
  data: {
    class: ['@五年级一班', '@五年级二班', '@五年级三班', '@五年级四班'],
    subject: ['付费用户', '所有人'],
    classindex: 0,
    subjectindex: 0,
    focus: false,
    sendTag: false,
    title: "",
    info: "",
    bid: ""
  },
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: "发布作业"
    });
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
    this.setData({
      classindex: e.detail.value
    })
  },
  bindSubjectChange: function (e) {
    this.setData({
      subjectindex: e.detail.value
    })
  },
  bindFocus: function () {
    this.setData({
      focus: true
    })
  },
  publishWork: function () {
    var that = this;
    that.setData({
      sendTag: true
    })
    common.requestServer("p=member&ac=task&d=addTaskInfo",
      {
        "tid": that.data.bid,
        "title": that.data.title,
        "info": that.data.info
      },
      function (data) {
        if (data.status == "success") {
          common.showToast("作业发布成功", true);
          wx.setStorage({
            key: "workReload",
            data: true
          })
          setTimeout(function () {
            that.setData({
              sendTag: false
            })
            wx.navigateBack()
          }, 2000);
        } else {
          that.setData({
            sendTag: false
          })
          common.showToast("作业发布失败");
        }
      })

  },
  getValue1: function (e) {
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