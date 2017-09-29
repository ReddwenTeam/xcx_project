Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: [
      { id: 0, value: 'a', name: '一年级' }, 
      { id: 1, value: 'b', name: '二年级' },
      { id: 2, value: 'c', name: '三年级' },
      { id: 3, value: 'd', name: '四年级' },
      { id: 4, value: 'e', name: '五年级' },
      { id: 5, value: 'f', name: '六年级' }
    ],
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
    Grade: 0,
    Classes:0, 
    Parent:0,
    Sex: 0
        
  }, 

  bindGradeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Grade: e.detail.value
    })
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