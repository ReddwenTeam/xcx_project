
var common = require("../../common/js/common.js");
var curCourseList = [], curPage = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _posterInfo: "", 
    videoList:"",
    part:"quanbu"
  },
  onLoad: function (param) {
    curCourseList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryList();
    //quanbu
    //https://xcx.51zhenkun.com/addons/star_school/app/index.php?p=course&ac=vcourse&d=getVcoursesParam&isNeedPager=false&pindex=1&psize=1&memberid=1
    //goumaikecheng
    //https://xcx.51zhenkun.com/addons/star_school/app/index.php?p=course&ac=vcourse&d=getBuycoursesParam&isNeedPager=false&pindex=1&psize=1&memberid=1
  },
  queryList:function(curPage){
    var that = this;
    wx.getStorage({
      key: "bindingInfo",
      success: function (res) {
        that.memberid = res.data.memberid;
        console.log(that.memberid);
        var url = "";
        switch (that.data.part){
          case 'quanbu':
            url = "p=course&ac=vcourse&d=getVcoursesParam&isNeedPager=false";
            break;
          case 'goumai':
            url = "p=course&ac=vcourse&d=getBuycoursesParam&isNeedPager=false";
            break;
           default:break;
        }
        common.requestServer(url, { "pindex": curPage, "psize": 20, "memberid": that.memberid, }, function (data) {
            console.log(data);
            var arr = [],
              firstItem =  [];
              //这里要改一下哈，关于data的数据格式。
            if(data.length > 1){
              firstItem = data[0][0];
              arr = data[0].slice(1);
              that.setData({
                videoList: arr
              })

              that.setData({
                _posterInfo: firstItem
              })
            }else{
              firstItem = data[0]||[];
              console.log(firstItem);

              that.setData({
                _posterInfo: firstItem
              })
              that.setData({
                videoList: []
              })
            }
            
          })
      }
    });
  },
  tapCheck:function(event){
    var dataSet = event.currentTarget.dataset;
    this.setData({
      pageNum: dataSet.pageNum
    });
    if (dataSet.pageNum == 0) {
      this.setData({
        part: "quanbu"
      });
      this.queryList();
      
    } else {
      this.setData({
        part: "goumai"
      })
      this.queryList();
      
    }
  },
  jumpToDetail:function(){

  }
})


