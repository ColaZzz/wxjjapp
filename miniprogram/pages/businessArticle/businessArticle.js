// miniprogram/pages/businessArticle/businessArticle.js
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
    releaseFocus: false,
    hidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let id = options.id
    let params = {
      id: id
    }

    wx.showLoading({
      title: '加载中..'
    })

    api.request('businessarticle', 'GET', params).then(res => {
      that.setData({
        list: res,
        hidden: false
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

  /**
   * 点击回复
   */
  bindReply: function(e) {
    this.setData({
      releaseFocus: true
    })
    console.log(this.data.releaseFocus)
  }
})