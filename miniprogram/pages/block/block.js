// miniprogram/pages/block/block.js
import api from '../../common/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 提交
   */
  submit(e) {
    wx.showModal({
      title: '确认',
      content: '确认提交吗',
      success(mod) {
        // 点击了确认
        if (mod.confirm) {
          wx.showLoading({
            title: '正在提交单据..',
            mask: true
          })

          let url = app.url
          let formList = e.detail.value
          let js = JSON.stringify(formList)
          let token = wx.getStorageSync('token')
          api.oldRequest('sendblocklist', 'POST', {
              jsonstr: js,
              token: token
            })
            .then(res => {
              if (res.msg != "用户未登录") {
                // 成功了
                let {
                  qrcode,
                  datetime
                } = res.data
                
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../block_qrcode/block_qrcode?qrcode=' + qrcode + '&datetime=' + datetime,
                  })
                }, 2000)
              } else {
                // 过期了
                // 用户登录
                wx.login({
                  success(res) {
                    wx.request({
                      url: url + 'login',
                      method: 'POST',
                      data: {
                        code: res.code
                      },
                      success(result) {
                        let session_3rd = result.data.data
                        wx.setStorageSync('token', session_3rd)

                        wx.showModal({
                          title: '提示',
                          content: '由于长时间未使用小程序，请重新提交'
                        })
                      }
                    })
                  }
                })

              }
              wx.hideLoading()
            })
            .catch(err => {
              wx.hideLoading()
              wx.showModal({
                title: '错误',
                content: '服务出错了，请稍后再试或者联系管理员'
              })
            })
        } else if (mod.cancel) {
          // 点击了取消

        }
      }
    })
  },
  myRecommendation(){
    wx.navigateTo({
      url: '../block_myQrcode/block_myQrcode',
    })
  }
})