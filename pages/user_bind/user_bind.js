Page({
  data: {
    pageNum:0,
    tempName:"jiazhang"
  },
  onLoad: function (param) {
    console.log(param)
    this.setData({
      avatarUrl: param.avatarUrl
    });
  },
  tapCheck: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.setData({
      pageNum: dataSet.pageNum
    });
    if (dataSet.pageNum == 0){
      this.setData({
        tempName: "jiazhang"
      });
    }else{
      this.setData({
        tempName: "laoshi"
      })
    }
  }
})