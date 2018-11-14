// miniprogram/pages/block_myQrcode/block_myQrcode.js
import api from '../../common/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'aspectFill',
    lazyLoad: 'true',
    linkageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadLinkages()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 初始化联动记录
   */
  loadLinkages() {
    wx.showLoading({
      title: '加载中..',
      mask: true
    })
    let token = wx.getStorageSync('token')
    api.oldRequest('personlinkages', 'POST', {
      token: token
    }).then(res => {
      if (res.msg == '获取记录') {
        this.setData({
          linkageList: res.data
        })
      } else if (res.msg == '用户未登录') {
        // 先登录
        api.login().then(log => {
          // 再递归
          console.log(log)
          this.loadLinkages()
        })
      }
      wx.hideLoading()
    })
  },

  /**
   * 点击进入二维码大图
   */
  qrcodeTap(e) {
    let qrcode = e.currentTarget.dataset.qrcode
    let datetime = e.currentTarget.dataset.datetime
    wx.navigateTo({
      url: '../block_qrcode/block_qrcode?qrcode=' + qrcode + '&datetime=' + datetime,
    })
  }
})