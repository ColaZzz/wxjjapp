// miniprogram/pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    recStartTime: 0,
    show: false,
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  getUserInfo(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  netRecommendation() {
    wx.navigateTo({
      url: '../block/block',
    })
  },

  /**
   * 长按事件
   */
  longpress(e) {},

  /**
   * 长按事件改造
   */
  startTap(e) {
    this.setData({
      recStartTime: e.timeStamp
    })
  },

  /**
   * 长按事件改造
   */
  endTap(e) {
    let differ = e.timeStamp - this.data.recStartTime
    if (differ > 3000) {
      this.setData({
        show: true
      })
    }
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      console.log(this.data.password)
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  },

  /**
   * 获取通行码
   */
  PwdOnChange(e){
    this.setData({
      password: e.detail
    })
  }
})