// miniprogram/pages/block_qrcode/block_qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    datetime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.qrcode,
    })
  },

  /**
   * returnTap
   */
  returnTap(){
    wx.navigateTo({
      url: '../block_myQrcode/block_myQrcode',
    })
  },

  /**
   * goheadTap
   */
  goheadTap(){
    wx.navigateBack({
      delta: 1
    })
  }
})