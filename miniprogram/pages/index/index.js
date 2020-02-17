//index.js
const app = getApp()

Page({
  data: {
    scrollHeight: 0, // 滚动区域的高度
    iconImageHeight: 0,
    location: 'loading...',
    weatherArray: [],
    listArray: [], // json
    WeatherDataGenerateDateTime: "loading...",
    tips: "loading...",
    weatherIcon: "/images/icons/weather_1-128.png",
    weatherInfo: "",
    currentTemperature: "N/A",
  },

  onLoad: function () {
    this.calcScrollHeight();
    let that = this;
    // 页面加载完毕，获取用户的定位信息
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // console.log(longitude, latitude);
        wx.request({
          url: 'https://api.gugudata.com/location/geodecode?appkey=74ZEZVVEC5G4&longitude=' + res.longitude + '&latitude=' + res.latitude,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            if (!res.data || !res.data.Data) {
              console.error(res.data.DataStatus);
              return;
            }
            that.setData({
              location: res.data.Data[0].Township + ', ' + res.data.Data[0].District,
            });
            const showapi_url = 'https://route.showapi.com/9-5?showapi_appid=146633&from=5&lng=' + longitude + '&lat=' + latitude + '&needMoreDay=1&needIndex=1&needHourData=0&need3HourForcast=0&needAlarm=0&showapi_sign=fd5ee50c2713400aa2ae4796b198729c';
            wx.request({
              url: showapi_url,
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                that.setData({
                  weatherArray: that.remapData(res.data.showapi_res_body)
                });
                console.log(res.data.showapi_res_body)
                that.setData({
                  WeatherDataGenerateDateTime: "更新时间："+res.data.showapi_res_body.now.temperature_time,
                  currentTemperature: res.data.showapi_res_body.now.temperature,
                  tips: "空气质量" + res.data.showapi_res_body.now.aqiDetail.quality,
                  weatherInfo: res.data.showapi_res_body.f1.day_weather + "转" + res.data.showapi_res_body.f1.night_weather
                });
              }
            })
          }
        })
      }
    })
  },

  // 计算滚动区域的高度
  calcScrollHeight() {
    let that = this;
    let query = wx.createSelectorQuery().in(this);
    query.select('.top').boundingClientRect(function (res) {
      let topHeight = res.height;
      let screenHeight = wx.getSystemInfoSync().windowHeight;

      let scrollHeight = screenHeight - topHeight - 70; // 屏幕的高度 - 头部蓝色区域高 - 标题栏

      that.setData({
        scrollHeight: scrollHeight,
        iconImageHeight: topHeight / 2
      })
    }).exec();
  },

  remapData(data) {
    let listData = [];
    let item = { info: "", weekday: "", TemperatureHigh: "", TemperatureLow:""}
    //第一天
    item.info = data.f1.day_weather;
    item.weekday = this.getWeekday(data.f1.weekday);
    item.TemperatureHigh = data.f1.day_air_temperature;
    item.TemperatureLow = data.f1.night_air_temperature;
    listData.push(item)
/*     //第二天
    listData[1].info = data.f2.day_weather;
    listData[1].weekday = this.getWeekday(data.f2.weekday);
    listData[1].TemperatureHigh = data.f2.day_air_temperature;
    listData[1].TemperatureLow = data.f2.night_air_temperature;
    //第三天
    listData[2].info = data.f3.day_weather;
    listData[2].weekday = this.getWeekday(data.f3.weekday);
    listData[2].TemperatureHigh = data.f3.day_air_temperature;
    listData[2].TemperatureLow = data.f3.night_air_temperature;
    //第四天
    listData[3].info = data.f4.day_weather;
    listData[3].weekday = this.getWeekday(data.f4.weekday);
    listData[3].TemperatureHigh = data.f4.day_air_temperature;
    listData[3].TemperatureLow = data.f4.night_air_temperature;
    //第五天
    listData[4].info = data.f5.day_weather;
    listData[4].weekday = this.getWeekday(data.f5.weekday);
    listData[4].TemperatureHigh = data.f5.day_air_temperature;
    listData[4].TemperatureLow = data.f5.night_air_temperature;
    //第六天
    listData[5].info = data.f6.day_weather;
    listData[5].weekday = this.getWeekday(data.f6.weekday);
    listData[5].TemperatureHigh = data.f6.day_air_temperature;
    listData[5].TemperatureLow = data.f6.night_air_temperature; */
    this.setData({
      listArray: listData,
    });
    return data;
  },

  getWeekday(date) {
    var mydate = new Date(date);
    var myddy = mydate.getDay();
    var weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    return weekday[myddy];
  },
  /*   getWeatherIcon(weather) {
      switch (weather) {
        case "多云转中雨":
          return "/images/icons/weather_icon_17.svg";
        case "多云转晴":
          return "/images/icons/weather_icon_3.svg";
        case "中雨转多云":
          return "/images/icons/weather_icon_8.svg";
        case "晴转多云":
          return "/images/icons/weather_icon_3.svg";
        case "多云":
          return "/images/icons/weather_icon_2.svg";
        case "雷阵雨转多云":
          return "/images/icons/weather_icon_24.svg"
        case "晴":
          return "/images/icons/weather_icon_47.svg"
          break;
      }
    } , */
  getWeatherIcon(weather) {
    switch (weather) {
      case "晴":
        return "/images/weather_china/d00.gif";
      case "多云转晴":
        return "/images/icons/weather_icon_3.svg";
      case "中雨转多云":
        return "/images/icons/weather_icon_8.svg";
      case "晴转多云":
        return "/images/icons/weather_icon_3.svg";
      case "多云":
        return "/images/icons/weather_icon_2.svg";
      case "雷阵雨转多云":
        return "/images/icons/weather_icon_24.svg"
      case "晴":
        return "/images/icons/weather_icon_47.svg"
        break;
    }
  }
})