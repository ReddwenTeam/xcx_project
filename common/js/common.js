//请求服务
function requestServer(url,param,callback){
  wx.request({
    url: url,
    data: param,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof callback == "function"){
        callback(res.data);
      }
    }
  })
}

module.exports = {
  requestServer: requestServer
}