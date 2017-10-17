var common = require("../../common/js/common.js");
var curWorksList = [], curPage = 1;
Page({
  data: {
    Works_list: [],
    bid:""
  },
  onLoad: function (param) {
    curWorksList = [];
    curPage = 1;
    var that = this;
    // wx.setNavigationBarTitle({
    //   title: param.BarTitle
    // });
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          bid: res.data.bid
        })
      }
    })
  },
  onReady: function () {
    this.queryWorksList(curPage);
  },
  queryWorksList: function (page) {
    var that = this;
    common.requestServer("p=member&ac=task&d=getTasksParam&isNeadPager=true", { tid:this.data.bid,"pindex": page, "psize": 3 }, function (data) {
      console.log(data);
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
              text: "没有更多数据"
            }
          });
          curPage--;
        }
      } else {
        data.forEach(function (item) {
          var temp = {
            id: item.id,
            title: item.title,
            info: item.info,
            formateTime: common.formatTime(item.createtime, 'Y-M-D')
          }
          curWorksList.push(temp);
        });
        that.setData({
          Works_list: curWorksList
        });
      }
    })
  },
  ToWorksDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../course_detail/course_detail?id=' + dataSet.WorksId + '&BarTitle=' + dataSet.WorksName + '&price=' + dataSet.WorksPrice + '&ischarge=' + dataSet.WorksIscharge
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
    this.queryWorksList(curPage);
  }
})