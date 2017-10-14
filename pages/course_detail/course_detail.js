var VIDEO_LIST = [
  {
    img_src: "../../temp/course_1.png",
    title: "Develop a plan vest line",
    tag: "独特",
    video_src: "",
    duration: "4分50秒",
    teacher: "Sara",
    coursesNumber: 48,
    video_src: "http://61.128.155.132/65643246213481AE4A7B03D05/030011010059CC691F973632A153D4A129C567-F154-2B17-10C4-7EDD49767AB6.mp4?ccode=0502&duration=360&expire=18000&psid=61927c61c7adf6940568bcb27950ba75&ups_client_netip=125.70.0.191&ups_ts=1506588176&ups_userid=&utid=x10hEg44CQQCAX1GAL%2BT88Ze&vid=XMzA1MTkwNTY4MA%3D%3D&vkey=A98da6553237d249817833b2dddb9d2a8"
  },
  {
    img_src: "../../temp/course_2.png",
    title: "English courses revolution",
    tag: "创新",
    video_src: "",
    duration: "2分36秒",
    teacher: "Jack",
    coursesNumber: 12,
    video_src: "http://k.youku.com/player/getFlvPath/sid/0506588280120121de2fc/st/mp4/fileid/03000A010059CB73AB53F930791481FEBE7B71-9719-D6BF-95F5-308F685EF12D?k=828c9fff5dc7d97724132842&hd=0&myp=0&ts=118&ctype=12&ev=1&token=0504&oip=2101739711&ep=cieUHEyFXswI5SLdiD8bZni3diFcXP4J9h%2BF8NJjALshQZvNnj2gtZizOPZBFv4QcyYOEZ2E2aXg%0AGEcVYflEqGEQq0jaT%2Frp%2B4bm5a5TzOYGbhxDBMzVwFSeRjD1&ccode=0502&duration=118&expire=18000&psid=33c992f5be0edec9b50b37f04f01d79c&ups_client_netip=125.70.0.191&ups_ts=1506588280&ups_userid=&utid=x10hEg44CQQCAX1GAL%2BT88Ze&vid=XMzA1MTE5ODM4NA%3D%3D&vkey=A7f5f3335416b15a971eaac5445e5a3e1"
  },
  {
    img_src: "../../temp/course_3.png",
    title: "180天速成！快速学好口语！",
    tag: "唯一",
    duration: "7分40秒",
    teacher: "李样",
    coursesNumber: 48,
    video_src: "http://k.youku.com/player/getFlvPath/sid/05065883541511226e8f7/st/mp4/fileid/03000A010059CBC32415C5064F009F4E786EC8-2801-24F2-F5AB-9E20F12BF0F2?k=fcf5fcf9390fde46282cb345&hd=0&myp=0&ts=39&ctype=12&ev=1&token=0509&oip=2101739711&ep=cieUHEyFXs0F4SLaiT8bZSq3fCEIXP4J9h%2BF8NJjALshQZvN6j3Tw5y1PfpCEP1vciIPZu%2BErNjh%0AHzMcYfJLqWkQ3UreO%2FqW%2B4GR5aQmxpB2ZxtEBM2htlSeRjD4&ccode=0502&duration=38&expire=18000&psid=bdd9d168c153f1adc36ffac7bddf8f81&ups_client_netip=125.70.0.191&ups_ts=1506588354&ups_userid=&utid=x10hEg44CQQCAX1GAL%2BT88Ze&vid=XMzA1MTgxMDI0MA%3D%3D&vkey=Aef4a89cb94af7a4f475cfb85e8372d40",
  },
]
Page({
  data:{
    curPageName:"xiangqing",
    videoList: VIDEO_LIST
  },
  onLoad: function (param) {
    console.log(param)
    var that = this;
    wx.setNavigationBarTitle({
      title: param.BarTitle
    });
  },
  changePage:function(event){
    var dataSet = event.currentTarget.dataset;
    console.log(dataSet.pageName)
    this.setData({
      curPageName: dataSet.pageName
    })
  },
  setVideoSrc: function (event) {
    var dataSet = event.currentTarget.dataset;
    this.showPoster();
    this.setData({
      _posterInfo: {
        poster_title: dataSet.videoTitle,
        poster_tag: dataSet.videoTag,
        poster_duration: dataSet.videoDuration,
        poster_url: dataSet.videoPoster,
        video_url: dataSet.videoSrc
      }
    });
  },
})