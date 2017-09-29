Page({
  data: {
    class: ['@五年级一班', '@五年级二班', '@五年级三班', '@五年级四班'],
    subject: ['语文', '数学', '外语', '物理', '化学', '生物', '政治', '历史', '地理'],
    classindex: 0,
    subjectindex: 0    
  },
  bindClassChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classindex: e.detail.value
    })
  },
  bindSubjectChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subjectindex: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
})