Page({
  onLoad: function (options) {
    this.setDateList(this.data.min,this.data.max);
  },
  data: {
    dateList:[],
    currentIndex:2,
    min:-2,
    max:3,
    active:""
  },

  changeDate:function(e){
    if(e.detail.current == 0){
      this.setData({
        min: this.data.min-2
      })
      this.setData({
        currentIndex: 2
      })
      this.setDateList(this.data.min, this.data.max);
    }else if(e.detail.current == (this.data.dateList.length-1)){
      this.setData({
        max: this.data.max + 2
      })
      this.setData({
        currentIndex: this.data.dateList.length-2
      })
      this.setDateList(this.data.min, this.data.max);
    }
  },

  setDateList :function(MIN,MAX){
    var list = [];
    var temp = null;
    var date = new Date();
    for (var i = MIN; i < MAX; i++) {
      temp = addDateStr(date, (i * 3));
      list.push(getDateItem(temp));
    }
    
    this.setData({
      dateList: list
    })
  },
  askSchedule: function(e){
    console.log(e.currentTarget.dataset.datesource);
    this.setData({
      active: e.currentTarget.dataset.datesource
    })
  },
  goNext: function(){
    this.setData({
      currentIndex: this.data.currentIndex+1
    })
  },
  goPrev: function(){
    this.setData({
      currentIndex: this.data.currentIndex - 1
    })
  }
})
var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

function addDate(date, days) {
  if (days == undefined || days == '') {
    days = 0;
  }
  var date = new Date(date);
  date.setDate(date.getDate() + days);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return getFormatDate(month) + '-' + getFormatDate(day);
}

function addDateStr(date, days) {
  if (days == undefined || days == '') {
    days = 0;
  }
  var date = new Date(date);
  date.setDate(date.getDate() + days);
  return new Date(date);
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
  if (arg == undefined || arg == '') {
    return '';
  }
  var re = arg + '';
  if (re.length < 2) {
    re = '0' + re;
  }
  return re;
}


function getDateItem(Dates){
  
  var dateItem = {};
    dateItem.date0_current= addDateStr(Dates, -1) ,    //前一天时间戳
    dateItem.date0 = addDate(Dates, -1),             //前一天时间
    dateItem.week0 = dayNames[addDateStr(Dates, -1).getDay()],
    dateItem.date1_current = Dates,
    dateItem.date1 = addDate(Dates),
    dateItem.week1 = dayNames[new Date(Dates).getDay()],
    dateItem.date2_current = addDateStr(Dates, 1),    //后一天时间戳
    dateItem.date2 = addDate(Dates, 1),             //后一天时间
    dateItem.week2=dayNames[addDateStr(Dates, 1).getDay()]
 
  return dateItem;
}