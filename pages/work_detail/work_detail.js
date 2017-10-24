var common = require("../../common/js/common.js");
Page({
  data: {
    workInfo : {},
    appMemberid: ""
  },
  onLoad: function (param) {
    var that = this;
    if (param.workType == 1) {
      that.setData({
        showDel: true
      });
    }
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    //  && workInfo.tid == appMemberid
    // wx.getStorage({
    //   key: "bindingInfo",
    //   success: function (res) {
    //     that.setData({
    //       appMemberid: res.data.memberid
    //     })
    //   }
    // })
    this.queryWorkInfo(param.id);
    this.setData({
      workId: param.id
    })
  },
  queryWorkInfo:function(id){
    var that = this;
    common.requestServer("p=member&ac=task&d=getTaskParam", { "id": id }, function (data) {
      data.formateTime = common.formatTime(data.createtime, 'Y-M-D  h:m:s')
      that.setData({
        workInfo: data
      })
    })
  },
  deleteWork:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除作业么？',
      success: function (res) {
        if (res.confirm) {
          deleteEvent();
        }
      }
    })
    function deleteEvent(){
      wx.getStorage({
        key: "bindingInfo",
        success: function (res) {
          common.requestServer("p=member&ac=task&d=deleteTaskInfo", { "id": that.data.workId, "tid": res.data.bid }, function (data) {
            if (data.status == "success") {
              common.showToast("作业删除成功", true);
              wx.setStorage({
                key: "workReload",
                data: true
              })
              setTimeout(function () {
                wx.navigateBack()
              }, 2000)
            } else {
              common.showToast("作业删除失败");
            }
          })
        }
      })
    }
  }
})