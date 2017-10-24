var common = require("../../common/js/common.js");
Page({
  data: {
    class: ['@五年级一班', '@五年级二班', '@五年级三班', '@五年级四班'],
    subject: ['付费用户', '所有人'],
    classindex: 0,
    subjectindex: 0,
    focus: false,
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
            wx.navigateBack()
          }, 2000);
        } else {
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