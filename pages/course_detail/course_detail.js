var common = require("../../common/js/common.js");
var allVideoList = [], curIndex = 0;
Page({
  data:{
    curPageName:"xiangqing",
    price:0,
    ischarge:0,
    poster:"",
    audition:0,
    items:{
      videoList: []
    }
  },
  onShow: function (param) {
    allVideoList = [];
  },
  onLoad: function (param) {
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    this.setData({
      price: param.price,
      ischarge: param.ischarge
    })
    this.queryDetail(param.id);
  },
  changePage:function(event){
    var dataSet = event.currentTarget.dataset;
    this.setData({
      curPageName: dataSet.pageName
    });
    this.showPanel(dataSet.pageName, curIndex)
  },
  queryDetail:function(id){
    var that = this;
    common.requestServer("http://weiqing.startingline.com.cn/addons/star_school/app/index.php?p=course&ac=cvideo&d=getCvideosParam&isNeadPager=false", { "vcourseid": id }, function (data) {
      if(data.length>0){
        data.forEach(function (item) {
          item.formatTime = common.formatTime(item.createtime, 'Y-M-D');
        });
        allVideoList = data;
        that.showPanel("xiangqing", 0);
      }else{
        wx.showToast({
          title: '暂无视频信息!',
          image: '../../common/image/cry.png',
          duration: 2000
        })
      }
    })
  },
  showPanel: function (type,index){
    var that = this;
    if (allVideoList.length>0){
      switch (type) {
        case "xiangqing":
          that.setData({
            poster: allVideoList[index].picarr,
            video_src: allVideoList[index].videourl,
            audition: allVideoList[index].audition,
            items: {
              videoList: allVideoList[index]
            }
          })
          break;
        case "mulu":
          that.setData({
            items: {
              videoList: allVideoList
            }
          });
          break;
        case "kecheng":
          // that.setData({
          //   items: {
          //     videoList: allVideoList
          //   }
          // });
          break;
        default: break;
      }
    }
  },
  ToPlay: function(event){
    var dataSet = event.currentTarget.dataset;
    this.setData({
      curPageName: "xiangqing"
    });
    curIndex = dataSet.videoIndex;
    this.showPanel("xiangqing", dataSet.videoIndex);
  },
  toastInfo:function(){
    wx.showToast({
      title: '请购买该课程!',
      image: '../../common/image/cry.png',
      duration: 2000
    })
  }
})