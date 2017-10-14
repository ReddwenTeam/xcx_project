var common = require("../../common/js/common.js");
var curVideoList = [], curPage = 1;
var VIDEO_LIST = [
  {
    title: "他们有一种魔力，让我情不自禁",
    sub_title: "《光谷外校欢迎你》MV",
    tag: "独特",
    duration: "3分45秒",
    id: 1,
    poster_src: "../../temp/index_5.png"
  },
  {
    title:"风华正茂 海外扬帆",
    sub_title:"中学2016年迎新春音乐会",
    tag:"活力",
    duration:"120分45秒",
    id:2,
    poster_src:"../../temp/index_2.png"
  },
  {
    title: "好学生必是好创意者",
    sub_title: "创意无处不在宣传片",
    tag: "创意",
    duration: "10分45秒",
    id: 3,
    poster_src: "../../temp/index_3.png"
  },
  {
    title: "全方位呵护您孩子的营养健康",
    sub_title: "生活专家 每周食谱",
    tag: "健康",
    duration: "5分45秒",
    id: 4,
    poster_src: "../../temp/index_4.png"
  },
]

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
            price: item.price
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
      url: '../course_detail/course_detail?id=' + dataSet.videoId + '&BarTitle=' + dataSet.videoName + '&price=' + dataSet.videoPrice
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