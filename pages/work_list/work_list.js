var common = require("../../common/js/common.js");
var curWorksList = [], curPage = 1;
Page({
  data: {
    Works_list: [],
  },
  onLoad: function (param) {
    var that = this;
    if (param.workType == 1) {
      that.setData({
        showAdd: true
      });
    }
    that.setData({
      workType: param.workType
    });
    curWorksList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: "作业列表"
    });
    that.exeQuery();
  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'workReload',
      success: function (res) {
        if (res.data) {
          curWorksList = [];
          curPage = 1;
          that.exeQuery();
          wx.removeStorage({ key: 'workReload' })
        }
      }
    })
  },
  exeQuery:function(){
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.setData({
          bid: res.data.bid,
          memberid: res.data.memberid,
        });
        that.queryWorksList(curPage);
      }
    })
  },
  queryWorksList: function (page) {
    var that = this;
    if (that.data.workType == 1) {
      //老师
      var url = "p=member&ac=task&d=getTasksParam&isNeadPager=true";
      var param = { "tid": that.data.bid, "pindex": page, "psize": 10 };
    } else if (that.data.workType == 2) {
      //家长
      var url = "p=member&ac=task&d=getTaskParamByBid";
      var param = { "memberid": that.data.memberid, "pindex": page, "psize": 10 };
    }
    queryList(url, param);

    function queryList(url, param){
      common.requestServer(url, param , function (data) {
        if (data.length == 0) {
          if (page == 1) {
            that.setData({
              Works_list: [],
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
              formateTime: common.formatTime(item.createtime, 'Y-M-D  h:m:s'),
              tavatar: item.tavatar,
              tname: item.tname              
            }
            curWorksList.push(temp);
          });
          that.setData({
            Works_list: curWorksList,
            loading: {
              status: false,
              load: false,
              text: ""
            }
          });
        }
      })
    }
  },
  ToWorkDetail: function (event) {
    var dataSet = event.currentTarget.dataset, that = this;
    wx.navigateTo({
      url: '../work_detail/work_detail?id=' + dataSet.workId + '&BarTitle=' + dataSet.workName + '&workType=' + that.data.workType
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