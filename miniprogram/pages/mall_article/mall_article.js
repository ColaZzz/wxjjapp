// miniprogram/pages/mall_article/mall_article.js
import api from '../../common/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: null,
    html: '',
    scrollItem: null,
    hidden: true,
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl: app.imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })
    let id = options.id
    // 获取文章信息
    let detail = api.request('article', 'GET', {
      id: id
    })
    // 获取随机文章
    let recommend = api.request('randomarticles', 'GET', {
      rows: 5
    })

    Promise.all([detail, recommend]).then(res => {
      // 时间字符串的转换
      let date = res[0].created_at
      res[0].created_at = date.split(' ')[0]
      
      this.setData({
        article: res[0],
        html: res[0].information,
        scrollItem: res[1],
        hidden: false
      })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: res[0].title,
      })
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

  recommendTap(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../mall_article/mall_article?id=' + id,
    })
  }
})