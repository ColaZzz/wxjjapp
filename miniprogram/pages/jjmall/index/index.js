// miniprogram/pages/jjmall/index/index.js
import api from '../../../common/api.js'
import fmt from '../../../common/format.js'
const app = getApp()
const icon = '/public/icon/mall-icon.png'
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
    swiperes: [],
    imgUrl: '',
    business: [],
    all_box: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中..',
    })
    this.setData({
      imgUrl: app.imgUrl
    })
    // 轮播图
    let swiperes = api.request('mallswiperes', 'GET')
    // 业态
    let business = api.request('mallbusinesses', 'GET')
    Promise.all([swiperes, business]).then(res => {
      this.setData({
        swiperes: res[0],
        business: res[1],
        all_box: false
      })
    }).then(() => {
      wx.hideLoading()
    })
  }
})