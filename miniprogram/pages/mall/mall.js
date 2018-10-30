// miniprogram/pages/mall/mall.js
import api from '../../common/api.js'
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
    list: [{
        img_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3053101037,2218498766&fm=26&gp=0.jpg'
      },
      {
        img_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1321784252,25532542&fm=26&gp=0.jpg'
      },
      {
        img_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1449781320,2531680375&fm=26&gp=0.jpg'
      }
    ],
    current: 'tab1',
    activeList: [],
    newsList: [],
    mode: 'aspectFill',
    lazyLoad: 'true'
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

    Promise.all([ac, news]).then(res => {
      this.setData({
        activeList: res[0].data,
        newsList: res[1].data
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
  }
})