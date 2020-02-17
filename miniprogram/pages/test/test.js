// miniprogram/pages/test/test.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类

    let that = this;
    // 页面加载完毕，获取用户的定位信息
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // console.log(longitude, latitude);
        wx.request({
          url: 'https://route.showapi.com/9-5?showapi_appid=146633&from=5&lng=' + res.longitude + '&lat=' + res.latitude + '&needMoreDay=1&needIndex=1&needHourData=0&need3HourForcast=0&needAlarm=0&showapi_sign=fd5ee50c2713400aa2ae4796b198729c',
/*            url: 'https://free-api.heweather.net/s6/weather/now?location=116.26,39.52&key=4f9baefdfb1a4c3182fda44444509075', */
          header: {
            'content-type': 'application/json'
          },
          success(res) {
              console.log(res.data);
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})