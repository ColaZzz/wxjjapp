// miniprogram/pages/jjmall/commodity/commodity.js
import api from '../../../common/api.js'
const app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    imgUrl: '',
    commodity: null,
    hidden: false
  },

  onLoad: function(options) {
    this.setData({
      hidden: true
    })
    wx.showLoading({
      title: '加载中..',
    })
    let id = options.id
    this.setData({
      imgUrl: app.imgUrl
    })
    api.request('mallcommodity', 'GET', {
        id
      })
      .then(res => {
        this.setData({
          commodity: res,
          hidden: false
        })
        wx.hideLoading()
      })
  },

  onReady: function() {

  },
})