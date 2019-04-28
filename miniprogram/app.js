//app.js
App({
  globalData: {
    userInfo: null
  },
  // 测试环境：0 生产环境：1
  currentEnvironment: 1,
  url: '',
  imgUrl: '',
  /**
   * 程序Load
   */
  onLaunch: function() {
    if (this.currentEnvironment) {
      // 生产环境
        this.url = 'https://api.gdjjjt.com:8089/api/'
        this.imgUrl = 'https://api.gdjjjt.com:8089/storage/'
    }else{
      // 测试环境
        this.url = 'http://jjapp.test/api/'
        this.imgUrl = 'http://jjapp.test/storage/'
    }

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