Page({
  data: {
    test: [],
  },
  onReady: function () {
    var _this = this;
    wx.request({
      url: 'http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax',
      data: {
        pindex: 1,//页数(从1页开始)
        psize: 1//每页查询的条数
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          test: res.data,
        })
      }
    })
  },
})