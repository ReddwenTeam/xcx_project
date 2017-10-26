var common = require("../../common/js/common.js");
var app = getApp();
Page({
  data: {
    role: "youke",
  },
  onShow: function () {
    this.getRole();
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    });
  },
  getRole: function () {
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        var data = res.data;
        if (data.bdtype == 1) {
          that.setData({
            role: 'laoshi'
          })
        } else if (data.bdtype == 2) {
          that.setData({
            role: 'jiazhang'
          })
        }
      }
    })
  },
  deleteBinding: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要解除绑定么？',
      success: function (res) {
        if (res.confirm) {
          deleteEvent()
        }
      }
    })
    function deleteEvent() {
      wx.getStorage({
        key: "bindingInfo",
        success: function (res) {
          var data = res.data;
          switch (data.bdtype) {
            //老师
            case 1: requestUnBind({ "bdtype": data.bdtype, "memberid": data.memberid, "bid": data.bid }); break;
            //家长
            case 2: requestUnBind({ "bdtype": data.bdtype, "memberid": data.memberid }); break;
            default: break;
          }
          function requestUnBind(param) {
            common.requestServer("p=member&ac=binding&d=deleteBinding", param, function (data) {
              if (data.status == "success") {
                common.showToast(data.msg, true);
                that.setData({
                  role: "youke"
                });
                wx.removeStorage({
                  key: 'bindingInfo'
                })
              } else {
                common.showToast(data.msg)
              }
            });
          }
        }
      })
    }
  },
  ToUserInfo: function () {
    wx.navigateTo({
      url: '../user_info/user_info'
    })
  },
  ToUserBind: function () {
    wx.navigateTo({
      url: '../user_bind/user_bind'
    })
  },
  ToNoticeList: function () {
    wx.navigateTo({
      url: '../notice_list/notice_list?BarTitle=活动通知'
    })
  },
  ToWorkList: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../work_list/work_list?BarTitle=作业列表&workType=' + dataSet.workType
    })
  },
  ToCourseList: function () {
    wx.navigateTo({
      url: '../my_course/my_course'
    })
  }
})