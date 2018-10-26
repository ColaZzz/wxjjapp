// miniprogram/pages/housePage/housePage.js
import api from '../../common/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let params = {
      id: options.id
    }

    wx.showLoading({
      title: 'loading',
    })

    api.request('estatearticle', 'GET', params).then(res => {
      that.setData({
        list: res
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  callPhoneTap() {
    let that = this
    let number;
    if (!that.data.list.estate.telephone) {
      number = '123456'
    } else {
      number = that.data.list.estate.telephone
    }
    wx.makePhoneCall({
      phoneNumber: number,
    })
  },

  // 楼盘跳转
  estateTap(event){
    let estate_id = event.currentTarget.dataset.estate
    wx.navigateTo({
      url: '../estateHome/estateHome?id=' + estate_id,
    })
  }
})