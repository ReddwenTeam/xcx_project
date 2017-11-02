var WxParse = require('../wxParse/wxParse.js');
/** 
 * 请求服务
*/
//var baseUrl = "https://weiqing.zqkj.site";
var baseUrl = "https://xcx.51zhenkun.com"; // 不同域名
var defaultUrl = "/addons/star_school/app/index.php?";
var uploadUrl = "/addons/star_school/app/index.php?p=comm&ac=upload&d=uploadIMG";
var payUrl = "/addons/star_school/payment/example/jsapi.php";
function requestServer(url,param,callback){
  if (url == "payUrl") {
    var curUrl = payUrl;
  }else{
    var curUrl = defaultUrl + url;
  }
  wx.request({
    url: baseUrl + curUrl,
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

function getUploadUrl(){

}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
} 

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 富文本解析
*/
function formatHtml(bindName, type, content, self, imagePadding) {
  WxParse.wxParse(bindName, type, content, self, imagePadding);
}

function showToast(msg,type){
  var image = '../../common/image/cry.png';
  if (type){
    image = '../../common/image/smile.png';
  }
  wx.showToast({
    title: msg,
    image: image,
    duration: 2000
  })
}

function aldShare(e,page){
  var url = page['__route__'];
  var data = {};
  data = e.currentTarget.dataset
  data['path'] = url;
  wx.showToast({
    title: '分享生成中...',
    icon: 'loading',
    duration: 999999
  })
  wx.request({
    method: 'post',
    url: 'https://shareapi.aldwx.com/Main/action/Template/Template/applet_htmlpng',
    data: data,
    success: function (data) {
      if (data.data.code === 200) {
        wx.previewImage({
          urls: [data.data.data]
        })
      }
      wx.hideLoading()
    },
    complete: function () {
      wx.hideLoading()
    },
    fail: function () {
      wx.hideLoading();
    }
  })
}

module.exports = {
  requestServer: requestServer,
  formatTime: formatTime,
  formatHtml: formatHtml,
  showToast: showToast,
  aldShare: aldShare,
  uploadUrl: baseUrl + uploadUrl
}