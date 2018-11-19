// miniprogram/pages/block/block.js
import api from '../../common/api.js'
import Toast from '../../dist/vant-weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    user: '',
    userNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    this.setData({
      user: null,
      userNumber: null
    })
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
              // 提交成功
              if (res.code == 1) {
                let {
                  qrcode,
                  datetime
                } = res.data

                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../block_qrcode/block_qrcode?qrcode=' + qrcode + '&datetime=' + datetime,
                  })
                }, 2000)
              } else if (res.code == 2) { // 登录过期
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
              } else if (res.code == 3) {
                wx.hideLoading()
                // 遍历对象
                for(let i in res.data){
                  Toast(res.data[i][0])
                  break
                }
              }
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
  myRecommendation() {
    wx.navigateTo({
      url: '../block_myQrcode/block_myQrcode',
    })
  }
})