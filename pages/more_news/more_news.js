var common = require("../../common/js/common.js");
var curPage = 1, curArticleList=[];
Page({
  data: {
    ArticleList:[],
    loading:{
      status:true,
      load: false,
      text: ""
    },
  },
  onLoad: function (param) {
    curArticleList = [];
    curPage = 1;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  onReady: function () {
    this.queryArticleList(curPage);    
  },
  queryArticleList: function(page){
    var that = this;
    common.requestServer("p=news&ac=artic&d=getArticsParam&isNeadPager=true&f=ajax", { "pindex": page, "psize": 5 }, function (data) {
      if (data.length == 0){
        if (page == 1){
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "暂无数据"
            }
          });
        }else{
          that.setData({
            loading: {
              status: true,
              load: false,
              text: "没有更多数据"
            }
          });
          curPage--;
        }
      }else{
        data.forEach(function (item) {
          item.formatTime = common.formatTime(item.createtime, 'Y-M-D');
          curArticleList.push(item);
        });
        that.setData({
          ArticleList: curArticleList
        });
      }
    });
  },
  ToArticleDetail: function (event){
    var dataSet = event.currentTarget.dataset;
    console.log(dataSet);
    wx.navigateTo({
      url: '../news_detail/news_detail?id=' + dataSet.articleId + '&BarTitle=' + dataSet.articleName
    })
  },
  onReachBottom:function(){
    this.setData({
      loading:{
        status: true,
        load: true,
        text: "加载中..."
      }
    });
    curPage ++;
    this.queryArticleList(curPage);
  }
})