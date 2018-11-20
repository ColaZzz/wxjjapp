// miniprogram/pages/user/user.js
import md5 from '../../common/md5.js'
import api from '../../common/api.js'
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
    app.loginAPI()
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
<<<<<<< HEAD
    if (differ > 2000) {
      this.checkRole()
=======
    if (differ > 1000) {
      this.checkRole(differ)
>>>>>>> 3e3320ed668e46bda50c6ce883e4620d493a2333
    }
  },

  /**
   * 判断是否进入扫描界面
   */
  checkRole(differ) {
    api.oldRequest('checklinkagerole', 'POST', {
        token: wx.getStorageSync('token')
      })
      .then(res => {
        if (res.code == 2) {
          api.login().then(()=>{
            this.checkRole()
          })
        } else if (res.msg == '确认通过') {
          // 成功跳转
          wx.navigateTo({
            url: '../block_Scan/block_Scan',
          })
        } else {
          // 确认失败
          wx.showToast({
            title: differ / 1000 + '秒',
            duration: 2000
          })
        }
      })
  },

  // onClose(event) {
  //   if (event.detail === 'confirm') {
  //     // 确认通行码
  //     let secret = md5(this.data.password)
  //     api.oldRequest('checkscancode', 'POST', {
  //         code: secret
  //       })
  //       .then(res => {
  //         if (res.msg == '确认成功') {
  //           this.setData({
  //             show: false
  //           })
  //         }else{
  //           this.setData({
  //             show: false
  //           })
  //           wx.showToast({
  //             title: '通行码错误',
  //             icon: 'success',
  //             duration: 2000
  //           })
  //         }
  //       })
  //     // 异步关闭弹窗
  //     // setTimeout(() => {
  //     //   this.setData({
  //     //     show: false
  //     //   });
  //     // }, 1000);
  //   } else {
  //     this.setData({
  //       show: false
  //     });
  //   }
  // },

  /**
   * 获取通行码
   */
  PwdOnChange(e) {
    this.setData({
      password: e.detail
    })
  }
})