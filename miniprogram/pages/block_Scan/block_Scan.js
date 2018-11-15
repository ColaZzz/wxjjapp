// miniprogram/pages/block_Scan/block_Scan.js
import api from '../../common/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkage: null,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 扫码
   */
  scanCode() {
    let that = this
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        if (res.errMsg == 'scanCode:ok') {
          let code = res.result
          let token = wx.getStorageSync('token')
          that.getLinkageInfo(code, token)   
        }
      }
    })
  },

  /**
   * 扫码后的请求
   */
  getLinkageInfo(code, token) {
    api.oldRequest('scancodelinkage', 'POST', {
        code,
        token
      })
      .then(res => {
        if (res.code == 1) {
          this.setData({
            linkage: res.data,
            show: true
          })
          console.log(this.data.linkage)
        } else if (res.code == 2) {
          api.login().then(() => {
              this.getLinkageInfo(code, wx.getStorageSync('token'))
            })
        } else if (res.code == 3) {
          wx.showToast({
            title: '二维码无效',
            image: '../../public/icon/fail.png',
            duration: 2000
          })
        }
      })
  },

  /**
   * 关闭对话框
   */
  onClose(event) {
    if (event.detail === 'confirm') {
      this.setData({
        show: false
      });
    }
  }
})