// miniprogram/pages/mall/mall.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    swiperList: [],
    current: 'tab1',
    activeList: [],
    newsList: [],
    topList: [],
    mode: 'aspectFill',
    lazyLoad: 'true',
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    // 最新活动栏的加载
    let ac = api.request('articles', 'GET', {
      type: 1
    })
    // 商户资讯栏的加载
    let news = api.request('articles', 'GET', {
      type: 2
    })
    // 最热资讯栏的加载
    let top = api.request('articles', 'GET', {
      rank: 'desc'
    })
    // 轮播图的加载
    let swiper = api.request('mallswiper', 'GET')

    Promise.all([ac, news, swiper, top]).then(res => {
      let active = res[0].data
      for (let i = 0; i < active.length; i++) {
        active[i].created = fmt.getMMdd(active[i].created_at)
      }

      let news = res[1].data
      for (let i = 0; i < news.length; i++) {
        news[i].created = fmt.getMMdd(news[i].created_at)
      }

      let top = res[3].data
      for (let i = 0; i < top.length; i++) {
        top[i].created = fmt.getyyyyMMdd(top[i].created_at)
      }

      this.setData({
        activeList: active,
        newsList: news,
        swiperList: res[2],
        topList: top,
        hidden: false
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

  /**
   * 第一二个菜单
   */
  articleTap(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../mall_articleList/mall_articleList?type=' + type,
    })
  },

  /**
   * 
   */
  cellTap(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../mall_article/mall_article?id=' + id,
    })
  },

  /**
   * 店铺导航
   */
  navigationTap(){
    wx.navigateTo({
      url: '../mall_navigation/mall_navigation',
    })
  }
})