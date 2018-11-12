//app.js
App({
  onLaunch: function() {
    let that = this

    this.url = 'http://jjapp.test/api/'
    // this.url = 'https://togetherwoh.com/api/'
    this.estateImgPrefix = 'http://jjapp.test/uploads/estates/'
    this.img_url = 'http://jjapp.test/uploads/estates/'

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 用户登录
    wx.login({
      success(res) {
        wx.request({
          url: that.url + 'login',
          method: 'POST',
          data: {
            code: res.code
          },
          success(result) {
            let session_3rd = result.data.data
            wx.setStorageSync('session_3rd', session_3rd)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})