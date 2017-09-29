Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    classes: [
      { id: 0, value: 'a', name: '一班' },
      { id: 1, value: 'b', name: '二班' },
      { id: 2, value: 'c', name: '三班' },
      { id: 3, value: 'd', name: '四班' },
      { id: 4, value: 'e', name: '五班' },
      { id: 5, value: 'f', name: '六班' }
    ],
    parent:[
      { id: 0, value: 'a', name: '父亲' },
      { id: 0, value: 'b', name: '母亲' },
      { id: 0, value: 'c', name: '其他' },
    ],
    sex: [
      { id: 0, value: 'a', name: '男' },
      { id: 0, value: 'b', name: '女' },
      { id: 0, value: 'c', name: '不详' },
    ],
    Classes:0, 
    Parent:0,
    Sex: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000    
  }, 

  bindClassesChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Classes: e.detail.value
    })
  },
  bindParentChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Parent: e.detail.value
    })
  },
  bindSexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Sex: e.detail.value
    })
  },
})