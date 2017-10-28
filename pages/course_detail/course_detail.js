var common = require("../../common/js/common.js");
var allVideoList = [], curIndex = 0 ;
var app = getApp();
Page({
  data:{
    curPageName:"xiangqing",
    price:0,
    ischarge:0,
    isbuy:"error",
    vcourseid:"",
    poster:"",
    audition:0,
    items:{
      videoList: []
    }
  },
  onLoad: function (param) {
    var that = this;
    allVideoList = [];
    that.player = wx.createVideoContext('myVideo');
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
    that.setData({
      price: param.price,
      ischarge: param.ischarge,
      isbuy: param.isbuy,
      vcourseid: param.id,
      xnumber: param.xnumber
    });
    that.queryDetail(param.id);
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
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.memberid = res.data.memberid;
        common.requestServer("p=course&ac=cvideo&d=getCvideosParam&isNeadPager=false", { "vcourseid": id, "memberid": res.data.memberid }, function (data) {
          if (data.length > 0) {
            data.forEach(function (item) {
              item.formatTime = common.formatTime(item.createtime, 'Y-M-D');
            });
            allVideoList = data;
            that.showPanel("xiangqing", 0);
          } else {
            that.setData({
              isbuy: "zanwu"
            });
            common.showToast('暂无视频信息!');
          }
        })
      }
    });
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
          common.requestServer("p=course&ac=vcourse&d=getSamesParam", {}, function (data) {
            if(data.length > 0){
              data.forEach(function (item) {
                item.formatTime = common.formatTime(item.createtime, 'Y-M-D');
              });
              that.setData({
                items: {
                  videoList: data
                }
              });
            }
          })
          break;
        default: break;
      }
    }
  },
  ToPlay: function(event){
    this.videoPause();
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
  },
  videoPause: function () {
    this.player.pause();
  },
  videoPlay: function () {
    this.player.play();
  },
  toPay: function (){
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        var data = res.data;
        wx.request({
          url: 'https://xcx.51zhenkun.com/addons/star_school/payment/example/jsapi.php',
          data: {
            "memberid": data.memberid,
            "vcourseid": that.data.vcourseid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var data = res.data;
            if (data.status == "error"){
              common.showToast(data.msg);
            }else{
              wx.requestPayment({
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': data.signType,
                'paySign': data.paySign,
                'success': function (res) {
                  that.setData({
                    isbuy: "success"
                  });
                  wx.setStorage({
                    key: "payReload",
                    data: true
                  })
                  common.showToast("支付成功！", true);
                }
              })
            }
          }
        })
      }
    })
  },
  ToVideoDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.queryDetail(dataSet.videoId);
    this.setData({
      price: allVideoList[0].price,
      ischarge: allVideoList[0].ischarge,
      isbuy: allVideoList[0].isbuy,
      vcourseid: allVideoList[0].id,
      curPageName: "xiangqing"
    });
    wx.setNavigationBarTitle({
      title: allVideoList[0].name
    });
    this.videoPause();
    this.showPanel("xiangqing", 0);
  },
  ToTeacherDetail: function (event) {
    var dataSet = event.currentTarget.dataset;
    wx.redirectTo({
      url: '../teacher_detail/teacher_detail?id=' + dataSet.teacherId + '&BarTitle=' + dataSet.teacherName
    })
  }
})