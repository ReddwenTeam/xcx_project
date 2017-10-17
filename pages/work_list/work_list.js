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
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          bid: res.data.bid
        })
      }
    })
  },
  onShow:function(){
    curWorksList = [];
    this.queryWorksList(curPage);
  },
  queryWorksList: function (page) {
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        queryList(res.data.bid)
      }
    })

    function queryList(tid){
      common.requestServer("p=member&ac=task&d=getTasksParam&isNeadPager=true", { "tid": tid, "pindex": page, "psize": 10 }, function (data) {
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
          that.setData({
            loading: {
              status: false,
              load: true,
              text: "加载中..."
            }
          });
        }
      })
    }
  },
  ToWorkDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../work_detail/work_detail?id=' + dataSet.workId + '&BarTitle=' + dataSet.workName
    })
  },
  ToPublishWork: function () {
    wx.navigateTo({
      url: '../publish_work/publish_work?BarTitle=发布作业'
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