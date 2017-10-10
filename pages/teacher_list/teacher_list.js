Page({
  data: {
    teacherList: [],
  },
  onReady: function () {
    var _this = this;
    wx.request({
      url: 'http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=teacher&ac=teacher&d=getCountrysParam',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          teacherList: res.data,
        })
      }
    })
  },
})