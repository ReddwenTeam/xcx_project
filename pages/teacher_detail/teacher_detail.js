Page({
  onLoad: function () {
    common.requestServer("p=teacher&ac=teacher&d=getTeacherParam", {
      'id': 3
    }, function (data) {
      console.log(data)
    });
  }
})