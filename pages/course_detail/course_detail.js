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
      data.forEach(function (item) {
        if (typeof item == "object"){
          item[0].formatTime = common.formatTime(item[0].createtime, 'Y-M-D');
        }
      });
      allVideoList = data;
      that.showPanel("xiangqing",0);
      
    })
  },
  showPanel: function (type,index){
    var that = this;
    switch (type) {
      case "xiangqing":
        console.log(allVideoList[index][0])
        that.setData({
          poster: allVideoList[index][0].picarr,
          video_src: allVideoList[index][0].videourl,
          audition: allVideoList[index][0].audition,
          items:{
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
        that.setData({
          items: {
            videoList: allVideoList
          }
        });
        break;
      default: break;
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