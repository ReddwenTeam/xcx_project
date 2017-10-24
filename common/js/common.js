var WxParse = require('../wxParse/wxParse.js');
/** 
 * 请求服务
*/
//var baseUrl = "https://weiqing.zqkj.site/addons/star_school/app/index.php?";
var baseUrl = "https://xcx.51zhenkun.com/addons/star_school/app/index.php?";
//course_detail publish_share
function requestServer(url,param,callback){
  wx.request({
    url: baseUrl+url,
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
function formatHtml(bindName, type, content, self) {
  var infoFlg = "<!--SPINFO#0-->";
  if (content.indexOf(infoFlg) > 0) {
    content = content.replace(/<!--SPINFO#0-->/, "");
  }
  var imgFlg = "<!--IMG#";
  var imgCount = (content.split(imgFlg)).length - 1;
  if (imgCount > 0) {
    for (var i = 0; i < imgCount; i++) {
      var imgStr = "<!--IMG#" + i + "-->";
      var imgSrc = "\"" + imgInfoArr[i].src + "\"";
      var imgHTML = "<div> <img style=\"width: 100%\" src=" + imgSrc + "> </div>";
      content = content.replace(imgStr, imgHTML);
    }
  }
  WxParse.wxParse(bindName, type, content, self, imgCount);
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

module.exports = {
  requestServer: requestServer,
  formatTime: formatTime,
  formatHtml: formatHtml,
  showToast: showToast
}