// miniprogram/pages/estateHome/estateHome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })

    let that = this
    let id = options.id
    wx.request({
      url: app.url + 'estate',
      method: 'GET',
      data: {
        id: id
      },
      success(res) {
        that.setData({
          data: res.data.data
        })
      },
      complete(){
        wx.hideLoading()
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

  },

  // 拨打电话
  callPhoneTap(){
    wx.makePhoneCall({
      phoneNumber: '123456',
    })
  },

  // 查看更多户型
  allHouse(){
    let that = this
    
    wx.navigateTo({
      url: '../houses/houses?id=' + that.data.data.id,
    })
  }
})