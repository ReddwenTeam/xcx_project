var common = require("../../common/js/common.js");
var curVideoList = [], curPage = 1;
Page({
  data: {
    video_list: []
  },
  onLoad: function (param) {
    var that = this;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  onShow: function () {
    curVideoList = [];
    curPage = 1;
  },
  onReady: function () {
    this.queryVideoList(curPage);
  },
  queryVideoList: function (page) {
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=course&ac=vcourse&d=getVcoursesParam&isNeadPager=true", { "pindex": page, "psize": 1 }, function (data) {
      if (data.length == 0) {
        if (page == 1) {
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "暂无数据"
            }
          });
        } else {
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "没有更多数据。"
            }
          });
          curPage--;
        }
      } else {
        data.forEach(function (item) {
          var temp = {
            title: item.name,
            sub_title: item.breif,
            tag: "",
            duration: "",
            id: item.id,
            poster_src: item.picarr,
            price: item.price,
            ischarge: item.ischarge
          }
          curVideoList.push(temp);
        });
        that.setData({
          video_list: curVideoList
        });
      }
      console.log(data);
    })
  },
  ToVideoDetail: function (event){
    var dataSet = event.currentTarget.dataset;
    console.log(dataSet)
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice + '&ischarge=' + dataSet.videoIscharge
    })
  },
  onReachBottom: function () {
    this.setData({
      loading: {
        status: true,
        load: true,
        text: "加载中..."
      }
    });
    curPage++;
    this.queryVideoList(curPage);
  }
})