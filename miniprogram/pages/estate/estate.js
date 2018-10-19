// miniprogram/pages/estate/estate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reg: '/[a-zA-z]+://[^\s]/',
    url: '',
    listData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    wx.request({
      url: app.url + 'estates',
      success(res){
        that.setData({
          url: app.estateImgPrefix,
          listData: res.data.data
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

  cellTap(event){
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../estateHome/estateHome?id=' + item.id,
    })
  }
})