//app.js
App({
  globalData: {
    userInfo: null
  },
  /**
   * baseUrl
   */
  url: 'http://jjapp.test/api/',
  /**
   * 地产图片地址
   */
  estateImgPrefix: 'http://jjapp.test/uploads/estates/',
  img_url: 'http://jjapp.test/uploads/estates/',
  /**
   * 程序Load
   */
  onLaunch: function() {
    this.loginAPI()
  },

  /**
   * 获取用户信息的封装
   */
  getUerInfoAPI() {
    let username
    let promise = new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          this.globalData.userInfo = res.userInfo
          username = res.userInfo.nickName
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
            username = res.userInfo.nickName
          }
          resolve(username)
        }
      })
    })
    return promise
  },

  /**
   * 登录的封装
   */
  loginAPI() {
    let url = this.url
    this.getUerInfoAPI().then(username => {
      wx.login({
        success(res) {
          wx.request({
            url: url + 'login',
            method: 'POST',
            data: {
              code: res.code,
              username: username
            },
            success(result) {
              let session_3rd = result.data.data
              wx.setStorageSync('token', session_3rd)
            }
          })
        }
      })
    })
  }
})