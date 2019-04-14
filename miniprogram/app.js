//app.js
App({
  globalData: {
    userInfo: null
  },
  // 本地开发地址
  // url: 'http://jjapp.test/api/',
  // imgUrl: 'http://jjapp.test/storage/',

  // 生产地址
  url: 'https://api.gdjjjt.com:8089/api/',
  imgUrl: 'https://api.gdjjjt.com:8089/storage/',
  /**
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
          wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
          username = res.userInfo.nickName
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
            username = res.userInfo.nickName
            wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
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
    let promise = new Promise((resolve, reject) => {
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
                resolve(result)
              }
            })
          }
        })
      })
    })
    return promise
  }
})